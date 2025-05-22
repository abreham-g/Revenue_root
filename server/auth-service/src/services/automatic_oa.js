// const { Pool } = require("pg");
// const dotenv = require("dotenv");
// const winston = require("winston");

// dotenv.config();

// const logger = winston.createLogger({
//   level: "info",
//   format: winston.format.combine(
//     winston.format.timestamp(),
//     winston.format.printf(({ timestamp, level, message }) => `[${timestamp}] ${level}: ${message}`)
//   ),
//   transports: [new winston.transports.Console()],
// });

// const pool = new Pool({
//   user: process.env.DB_USER,
//   host: process.env.DB_HOST,
//   database: process.env.DB_NAME,
//   password: process.env.DB_PASSWORD,
//   port: Number(process.env.DB_PORT),
//   ssl: {
//     rejectUnauthorized: false,
//     checkServerIdentity: () => null,
//   },
//   connectionString: `${process.env.DATABASE_URL}?sslmode=require&options=endpoint%3D${process.env.DB_ENDPOINT_ID}`,
// });

// async function fetchGWSData() {
//   try {
//     const res = await pool.query(`
//       WITH formatted_data AS (
//         SELECT 
//           *,
//           CASE WHEN store_roi_percent_1::text ~ '^[0-9.]+$' THEN store_roi_percent_1::numeric ELSE NULL END AS roi_1,
//           CASE WHEN "store_roi_%_2"::text ~ '^[0-9.]+$' THEN "store_roi_%_2"::numeric ELSE NULL END AS roi_2,
//           CASE WHEN "store_roi_%_3"::text ~ '^[0-9.]+$' THEN "store_roi_%_3"::numeric ELSE NULL END AS roi_3,
//           CASE WHEN "store_roi_%_4"::text ~ '^[0-9.]+$' THEN "store_roi_%_4"::numeric ELSE NULL END AS roi_4,
//           CASE WHEN "store_roi_%_5"::text ~ '^[0-9.]+$' THEN "store_roi_%_5"::numeric ELSE NULL END AS roi_5,
//           CASE WHEN "store_roi_%_6"::text ~ '^[0-9.]+$' THEN "store_roi_%_6"::numeric ELSE NULL END AS roi_6,
//           CASE WHEN "store_roi_%_7"::text ~ '^[0-9.]+$' THEN "store_roi_%_7"::numeric ELSE NULL END AS roi_7,
//           CASE WHEN "store_roi_%_8"::text ~ '^[0-9.]+$' THEN "store_roi_%_8"::numeric ELSE NULL END AS roi_8,
//           CASE WHEN "store_roi_%_9"::text ~ '^[0-9.]+$' THEN "store_roi_%_9"::numeric ELSE NULL END AS roi_9,
//           CASE WHEN "store_roi_%_10"::text ~ '^[0-9.]+$' THEN "store_roi_%_10"::numeric ELSE NULL END AS roi_10
//         FROM "SFS"."SFS_DATA"
//       )
//       SELECT * FROM formatted_data
//       WHERE 
//         (roi_1 BETWEEN 12 AND 100) OR
//         (roi_2 BETWEEN 12 AND 100) OR
//         (roi_3 BETWEEN 12 AND 100) OR
//         (roi_4 BETWEEN 12 AND 100) OR
//         (roi_5 BETWEEN 12 AND 100) OR
//         (roi_6 BETWEEN 12 AND 100) OR
//         (roi_7 BETWEEN 12 AND 100) OR
//         (roi_8 BETWEEN 12 AND 100) OR
//         (roi_9 BETWEEN 12 AND 100) OR
//         (roi_10 BETWEEN 12 AND 100)
//     `);

//     logger.info(`Fetched ${res.rowCount} rows from "SFS"."SFS_DATA"`);

//     const formatValue = (value) => {
//       if (value === null || value === undefined || value === 'N/A') return null;
//       if (typeof value === 'number') return value;
//       if (typeof value === 'string') {
//         const cleaned = value.replace('%', '').trim();
//         return cleaned && !isNaN(cleaned) ? parseFloat(cleaned) : null;
//       }
//       return null;
//     };

//     const formattedData = res.rows.map(row => {
//       const result = {
//         asin: row.asin,
//         title: row.title,
//         bb_price: formatValue(row.bb_price),
//         sales_rank_drops_30: row.sales_rank_drops_30,
//         weight_grams: formatValue(row.weight_grams),
//         referral_fee_percent: formatValue(row.referral_fee_percent),
//         referal_fees: formatValue(row.referal_fees),
//         fba_fees: formatValue(row["fba fees_($)"]),
//         timestamp: row.timestamp
//       };

//       // Add store data for 1-10
//       for (let i = 1; i <= 10; i++) {
//         result[`store_link_${i}`] = row[`store_link_${i}`];
//         result[`store_price_${i}`] = formatValue(row[`store_price_${i}`]);
//         result[`store_profit_${i}`] = formatValue(row[`store_profit_${i}`]);
//         result[`store_roi_${i}`] = formatValue(row[`store_roi_%_${i}`] || row[`roi_${i}`]);
//       }

//       return result;
//     });

//     logger.info('Data fetched successfully');
//     return formattedData;

//   } catch (error) {
//     logger.error('Error fetching SFS data: ' + error.message);
//     throw error;
//   }
// }

// module.exports = {
//   fetchGWSData,
// };

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
    const res = await pool.query(`
      WITH formatted_data AS (
        SELECT 
          asin,
          title,
          bb_price,
          sales_rank_drops_30,
          weight_grams,
          referral_fee_percent,
          referal_fees,
          "fba fees_($)" as fba_fees,
          timestamp,
          store_link_1, store_price_1, store_profit_1, store_roi_percent_1,
          store_link_2, store_price_2, store_profit_2, "store_roi_%_2" as store_roi_percent_2,
          store_link_3, store_price_3, store_profit_3, "store_roi_%_3" as store_roi_percent_3,
          store_link_4, store_price_4, store_profit_4, "store_roi_%_4" as store_roi_percent_4,
          store_link_5, store_price_5, store_profit_5, "store_roi_%_5" as store_roi_percent_5,
          store_link_6, store_price_6, store_profit_6, "store_roi_%_6" as store_roi_percent_6,
          store_link_7, store_price_7, store_profit_7, "store_roi_%_7" as store_roi_percent_7,
          store_link_8, store_price_8, store_profit_8, "store_roi_%_8" as store_roi_percent_8,
          store_link_9, store_price_9, store_profit_9, "store_roi_%_9" as store_roi_percent_9,
          store_link_10, store_price_10, store_profit_10, "store_roi_%_10" as store_roi_percent_10
        FROM "SFS"."SFS_DATA"
      )
      SELECT * FROM formatted_data
    `);

    logger.info(`Fetched ${res.rowCount} rows from "SFS"."SFS_DATA"`);

    const formatValue = (value) => {
      if (value === null || value === undefined || value === 'N/A') return null;
      if (typeof value === 'number') return value;
      if (typeof value === 'string') {
        const cleaned = value.replace('%', '').trim();
        return cleaned && !isNaN(cleaned) ? parseFloat(cleaned) : null;
      }
      return null;
    };

    const results = [];
    
    res.rows.forEach(row => {
      for (let i = 1; i <= 10; i++) {
        const roi = formatValue(row[`store_roi_percent_${i}`]);
        const storeLink = row[`store_link_${i}`];
        
        // Skip if no valid store link or invalid ROI
        if (!storeLink || storeLink === 'N/A' || roi === null) continue;
        
        // Only include stores with ROI between 12 and 100
        if (roi >= 12 && roi <= 100) {
          results.push({
            "ASIN": row.asin,
            "TITLE": row.title,
            "BUY BOX PRICE": formatValue(row.bb_price),
            "SALES RANK DROPS 30": row.sales_rank_drops_30,
            "STORE PRICE": formatValue(row[`store_price_${i}`]),
            "STORE PROFIT": formatValue(row[`store_profit_${i}`]),
            "STORE ROI": roi,
            "STORE LINK": storeLink
          });
        }
      }
    });

    logger.info(`Found ${results.length} valid store entries with ROI between 12-100`);
    return results;

  } catch (error) {
    logger.error('Error fetching SFS data: ' + error.message);
    throw error;
  }
}

module.exports = {
  fetchGWSData,
};

