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
  "myuniquebasket.com", "pinterest.com", "walmart.com", "amazon.com", "orientaltrading.com",
  "newegg.com", "overstock.com", "bonanza.com", "ecrater.com", "poshmark.com", "depop.com",
  "reverb.com", "chairish.com", "offerup.com", "marketplace.asos.com", "notonthehighstreet.com",
  "gumtree.com", "preloved.co.uk", "vinted.co.uk", "cex.co.uk", "cdiscount.com", "fnac.com",
  "rakuten.fr", "leboncoin.fr", "vinted.fr", "manomano.fr", "rueducommerce.fr", "showroomprive.com",
  "mercari.com", "zozo.jp", "flipkart.com", "snapdeal.com", "myntra.com", "meesho.com",
  "paytmmall.com", "indiamart.com", "shopclues.com", "limeroad.com", "quikr.com", "olx.in",
  "tatacliq.com", "subito.it", "privalia.it", "spartoo.it", "yoox.com", "kijiji.it", "eprice.it",
  "elcorteingles.es", "wallapop.com", "todocoleccion.net", "milanuncios.com", "vinted.es",
  "rakuten.es", "ebay.de", "otto.de", "zalando.de", "kaufland.de", "kleinanzeigen.de",
  "hood.de", "quoka.de", "yatego.com", "avocado-store.de", "rakuten.co.jp",
  "shopping.yahoo.co.jp", "auctions.yahoo.co.jp", "qoo10.jp", "paypaymall.yahoo.co.jp",
  "ebay.ca", "walmart.ca", "bestbuy.ca", "kijiji.ca", "newegg.ca", "zalando.it",
  "aliexpress.com", "etsy.com"
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
