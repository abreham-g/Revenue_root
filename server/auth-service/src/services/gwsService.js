// src/services/gwsService.js
const { Pool } = require("pg");
const dotenv = require("dotenv");
const winston = require("winston");

dotenv.config();

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message }) => `[${timestamp}] ${level}: ${message}`)
  ),
  transports: [new winston.transports.Console()],
});

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT),
  ssl: {
    rejectUnauthorized: false,
    checkServerIdentity: () => null,
  },
  connectionString: `${process.env.DATABASE_URL}?sslmode=require&options=endpoint%3D${process.env.DB_ENDPOINT_ID}`,
});

async function fetchGWSData() {
  try {
    const res = await pool.query('SELECT * FROM "GWS"."GWS_REPORT" WHERE "ROI" BETWEEN 12 AND 100');
    logger.info(`Fetched ${res.rowCount} rows from "GWS"."GWS_REPORT"`);

    const formattedData = res.rows.map((row) => {
      const stores = [
        { name: "FIRESTORM_GAMES", price: parseFloat((row.Firestorm_Price || '').replace('£', '').trim()), stock: parseInt(row.Firestorm_Stock), link: row.FIRESTORM_GAMES, image: row.Image },
        { name: "WAYLAND_GAMES", price: parseFloat((row.Wayland_Price || '').replace('£', '').trim()), stock: parseInt(row.Wayland_Stock), link: row.WAYLAND_GAMES, image: row.Image },
        { name: "ELEMENT_GAMES", price: parseFloat((row.Element_Price || '').replace('£', '').trim()), stock: parseInt(row.Element_Stock), link: row.ELEMENT_GAMES, image: row.Image },
        { name: "GOBLIN_GAMES", price: parseFloat((row.Goblin_Price || '').replace('£', '').trim()), stock: parseInt(row.Goblin_Stock), link: row.GOBLIN_GAMES, image: row.Image },
        { name: "WARLORD_WORKSHOP", price: parseFloat((row.Warlord_Price || '').replace('£', '').trim()), stock: parseInt(row.Warlord_Stock), link: row.WARLORD_WORKSHOP, image: row.Image },
        { name: "MARIONVILLE_GAMES", price: parseFloat((row.Marionville_Price || '').replace('£', '').trim()), stock: parseInt(row.Marionville_Stock), link: row.MARIONVILLE_GAMES, image: row.Image },
        { name: "4tk_links", price: parseFloat((row["4tk_Price"] || '').replace('£', '').trim()), stock: parseInt(row["4tk_Stock"]), link: row["4tk_links"], image: row.Image },
        { name: "HOBBY_WORKSHOP", price: parseFloat((row.HOBBY_WORKSHOP_Price || '').replace('£', '').trim()), stock: parseInt(row.HOBBY_WORKSHOP_Stock), link: row.HOBBY_WORKSHOP, image: row.Image },
        { name: "MAGIC_MADHOUSE", price: parseFloat((row.MAGIC_MADHOUSE_Price || '').replace('£', '').trim()), stock: parseInt(row.MAGIC_MADHOUSE_Stock), link: row.MAGIC_MADHOUSE, image: row.Image },
        { name: "MIGHTY_MEELE", price: parseFloat((row.MIGHTY_MEELE_Price || '').replace('£', '').trim()), stock: parseInt(row.MIGHTY_MEELE_Stock), link: row.MIGHTY_MEELE, image: row.Image },
        { name: "TRAVELLING_MAN", price: parseFloat((row.TRAVELLING_MAN_Price || '').replace('£', '').trim()), stock: parseInt(row.TRAVELLING_MAN_Stock), link: row.TRAVELLING_MAN, image: row.Image },
        { name: "BEANIE_GAMES", price: parseFloat((row.BEANIE_GAMES_Price || '').replace('£', '').trim()), stock: parseInt(row.BEANIE_GAMES_Stock), link: row.BEANIE_GAMES, image: row.Image },
        { name: "GAMES_WORKSHOP", price: parseFloat((row.GAMES_WORKSHOP_Price || '').replace('£', '').trim()), stock: parseInt(row.GAMES_WORKSHOP_Stock), link: row.GAMES_WORKSHOP, image: row.Image }
      ].filter(store => !isNaN(store.price) && store.price > 0);
      
      return {
        ID: row.ID,
        ASIN: row.ASIN,
        Title: row.TITLE,
        Image: row.Image,
        Link: `https://www.amazon.com/dp/${row.ASIN}`,
        Weight: parseInt(row.Weight_grams),
        ROI: typeof row.ROI === 'string' ? parseFloat(row.ROI.replace('%', '')) : parseFloat(row.ROI),
        Buybox: parseFloat(row.Buy_Box_Current),
        Cost: parseFloat(row.Cost),
        Stores: stores,
        BestPrice: Math.min(...stores.map(store => store.price)),
        Profit: parseFloat(row.Profit),
        Timestamp: new Date(row.Timestamp)

      };
    });

    formattedData.forEach((product, index) => {
      logger.info(`[Row ${index + 1}]: ${JSON.stringify(product)}`);
    });

    // await pool.end();
    logger.info('Data fetched successfully');
    return formattedData;

  } catch (error) {
    logger.info('Error fetching GWS data: ' + error);
    throw error;
  }
}

module.exports = {
  fetchGWSData,
};
