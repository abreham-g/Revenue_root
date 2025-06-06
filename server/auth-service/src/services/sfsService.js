const dotenv = require("dotenv");
const axios = require("axios");
const fs = require('fs');
const { Parser } = require('json2csv');
const path = require("path");
const fetchTop10ProductsFromOxylabs = require('./manualoa_oxylabsSearch');
const pLimitImport = require('p-limit');
const pLimit = pLimitImport.default ? pLimitImport.default : pLimitImport;
const limit = pLimit(5); // Max 5 concurrent requests

dotenv.config({ path: require('path').resolve(__dirname, '../../.env') });

class KeepaScrape {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.baseUri = "https://api.keepa.com/"; 
  }

  async callApi(uri) {
    try {
      const response = await axios.get(uri);
      return response.data;
    } catch (error) {
      console.error("API call failed:", error.message);
      throw error;
    }
  }

  extractMarketplaceNumber(marketplace) {
    const match = marketplace.match(/^\d+/);
    return match ? match[0] : null;
  }

  async getProduct(asinList, coming_domainId) {
    const domainId = this.extractMarketplaceNumber(coming_domainId); 
    const productData = [];

    const tasks = asinList.map(asin => limit(async () => {
      const uri = `${this.baseUri}product?key=${this.apiKey}&domain=${domainId}&asin=${asin}&stats=1&buybox=1&stock=1&offers=20`;
      console.log("Calling URL:", uri);
      try {
        const resp = await this.callApi(uri);
        if (resp.products) {
          productData.push(...resp.products);
        }
      } catch (e) {
        console.error(`Failed to fetch for ${asin}: ${e.message}`);
        productData.push({ ASIN: asin, error: "N/A" });
      }
    }));

    await Promise.all(tasks);
    return productData;
  }

  static getWeight(product) {
    return product.packageWeight ? product.packageWeight : null;
  }

  static fbaSellerCount(product) {
    const offers = product.offers || [];
    return offers.filter(o => o.isFBA).length;
  }

  static getReferralFee(product) {
    return product.referralFeePercentage?.toFixed(2) || "0.00";
  }

  static getBuyboxPrice(price) {
    return price ? `${(price / 100.0).toFixed(2)}` : '';
  }

  static liveFbaSellerCount(product) {
    let count = 0;
    const order = product.liveOffersOrder;
    const offers = product.offers;

    if (Array.isArray(order) && Array.isArray(offers)) {
      for (let index of order) {
        const offer = offers[index];
        if (offer?.isFBA) count += 1;
      }
    }

    return count;
  }

  static getSalesRank30Drop(product) {
    const drop = product?.stats?.salesRankDrops30;
    const rank = product?.stats?.avg30?.[3];
    if (drop && rank) {
      const percent = (drop / rank) * 100;
      return percent.toFixed(2);
    }
    return "0.00";
  }

  getResultsArray(products) {
    return products.map(product => {
      const asin = product.asin;
      const title = product.title || "No Title";
      const buyBox = KeepaScrape.getBuyboxPrice(product.stats.buyBoxPrice) || '0';
      const weight = KeepaScrape.getWeight(product);  
      const referralFee = KeepaScrape.getReferralFee(product);
      const salesRankDrop = product.stats.salesRankDrops30 || 0;
      const fbaFee = KeepaScrape.getBuyboxPrice(product.fbaFees?.pickAndPackFee);
      let referralFees = Math.round((buyBox * referralFee) / 100 * 100) / 100;
      return {
        ASIN: asin,
        TITLE: title,
        "Buy Box Current": buyBox,
        "Sales Rank: 30 days drop %": salesRankDrop,
        "Weight (g)": weight,
        "Referral Fee %": referralFee,
        "Referalfees": referralFees,
        "FBA fees": fbaFee,       
      };
    });
  }

  saveToCSV(data, filename = 'keepa_output.csv') {
    try {
      const parser = new Parser();
      const csv = parser.parse(data);
      fs.writeFileSync(filename, csv);
      console.log(`✅ Data saved to ${filename}`);
    } catch (err) {
      console.error("❌ Error writing CSV:", err.message);
    }
  }
}

async function runScrapingFlow(asins, keepaMarketplace, googleMarketplace,currency_factor) {
  const keepaApiKey = process.env.KEEPA_API;
  const oxylabsUsername = process.env.OXYLABS_USERNAME;
  const oxylabsPassword = process.env.OXYLABS_PASSWORD;
  const asinList = asins;
  const keepa_marketplace = keepaMarketplace;
  const google_Marketplace = googleMarketplace;

  if (!keepaApiKey || !oxylabsUsername || !oxylabsPassword) {
    throw new Error("Missing API credentials in .env file");
  }

  const keepa = new KeepaScrape(keepaApiKey);
  const products = await keepa.getProduct(asinList, keepa_marketplace);
  const keepaResults = keepa.getResultsArray(products);

  const oxylabsTasks = keepaResults.map(product => limit(async () => {
    const title = product.TITLE || product.title || '';
    const bbPrice = parseFloat(product["Buy Box Current"]);
    const weight = parseFloat(product["Weight (g)"]);
    const referralFee = parseFloat(product["Referalfees"]);
    const fbaFee = parseFloat(product["FBA fees"]);
    const currencyToUsd = currency_factor;
    const euroToUsd = 1.33;
    const profitFactor = 1.1;

    if (title) {
      const topLinks = await fetchTop10ProductsFromOxylabs(
        oxylabsUsername,
        oxylabsPassword,
        google_Marketplace,
        title
      );

      for (const link of topLinks) {
        let itemCost;
        const priceStr = link.price || "";
        const cadToUsd = 0.74;

        if (priceStr.includes("US$")) itemCost = parseFloat(priceStr.replace("US$", "").trim());
        else if (priceStr.includes("CA$")) itemCost = parseFloat(priceStr.replace("CA$", "").trim()) * cadToUsd;
        else if (priceStr.includes("$") && !priceStr.includes("CA$")) itemCost = parseFloat(priceStr.replace("$", "").trim());
        else if (priceStr.includes("£")) itemCost = parseFloat(priceStr.replace("£", "").trim()) * currencyToUsd;

        if (itemCost && bbPrice && weight && referralFee && fbaFee) {
          // const profit = bbPrice - itemCost - 1.1 - (weight * 0.01) - ((referralFee / 100) * itemCost) - fbaFee;
          // const profit = bbPrice - (itemCost *1.1) - (weight) - ((referralFee / 100) * itemCost)-fbaFee-0.7
          // const roi = (itemCost + profitFactor + (weight)) !== 0
          //   ? 
          //   ((profit / ((itemCost *1.1) + (weight)+0.7)).toFixed(2))
          //   // ((profit / (itemCost + profitFactor + (weight * 0.01))) * 100).toFixed(2)
          //   : 'N/A';
          const profit = buy_box_price - (itemCost * 1.1) - (weight_in_kg * 0.01) - 
               ((referral_fee_percentage / 100) * itemCost) - fba_fee - 0.7;

          const roi = ((itemCost * 1.1) + (weight * 0.01) + 0.7) > 0 
                      ? (profit / ((itemCost * 1.1) + (weight * 0.01) + 0.7)) * 100 
                      : 0;

          link.Profit = parseFloat(profit.toFixed(2));
          link.ROI = parseFloat(roi);
        } else {
          link.Profit = "N/A";
          link.ROI = "N/A";
        }
      }

      product.top_google_links = topLinks;
    }
  }));

  await Promise.all(oxylabsTasks);

  // const outputPath = path.join(__dirname, 'keepa_with_oxylabs_output.json');
  // fs.writeFileSync(outputPath, JSON.stringify(keepaResults, null, 2));
  // console.log(`✅ Output saved to ${outputPath}`);

  return keepaResults;
}

module.exports = { runScrapingFlow };
