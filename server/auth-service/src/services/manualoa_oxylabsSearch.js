const fetch = require("node-fetch");

// Oxylabs Product Search Function
async function fetchTop10ProductsFromOxylabs(username, password, domain, query) {
  const url = 'https://realtime.oxylabs.io/v1/queries';
  const encodedCredentials = Buffer.from(`${username}:${password}`).toString('base64');

  const payload = {
    source: "google_search",
    query: query,
    domain: domain,
    geo_location: "United Kingdom",
    locale: "en-GB",
    parse: true
  };

  const excludedMerchants = [
    "u-buy.co.uk", "ebay.com", "alibaba.com", "aliexpress.com", "ebay.co.uk", "wish.com",
    "asda.com", "sainsburys.co.uk", "tesco.com", "luxplus.co.uk", "lookfantastic.com",
    "etsy.com", "shein.co.uk", "onbuy.com", "temu.com", "ebay.fr", "fruugo.co.uk",
    "myuniquebasket.com", "pinterest.com", "walmart.com", "amazon.com", "orientaltrading.com"
  ];

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${encodedCredentials}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    const json = await response.json();
    const results = [];

    json.results?.forEach(result => {
      const organic = result.content?.results?.organic || [];

      for (const item of organic) {
        if (results.length >= 10) break;

        const productUrl = item.url || '';
        const additionalInfo = item.additional_info || [];

        // Find price info containing currency symbols like $, £, €
        const priceRegex = /([£$€]|US\$)\s?\d+(\.\d{1,2})?/;
        const price = additionalInfo.find(info => priceRegex.test(info)) || 'N/A';

        const isExcluded = excludedMerchants.some(merchant => productUrl.includes(merchant));
        if (productUrl && !isExcluded) {
          results.push({ url: productUrl, price });
        }
      }
    });

    return results;

  } catch (err) {
    console.error("❌ Error fetching Oxylabs data:", err.message);
    return [];
  }
}

module.exports = fetchTop10ProductsFromOxylabs;
