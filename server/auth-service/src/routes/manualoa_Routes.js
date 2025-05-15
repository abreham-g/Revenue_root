const express = require('express');
const router = express.Router();
const { runScrapingFlow } = require('../services/sfsService'); // import the function

router.post('/submit-asins', async (req, res) => {
  const { asins, keepa_marketplace, google_marketplace } = req.body;

  console.log("🔥 Incoming Request: POST /api/submit-asins");

  if (!asins || !Array.isArray(asins) || asins.length === 0) {
    return res.status(400).json({ success: false, message: 'No ASINs provided' });
  }

  if (!keepa_marketplace || typeof keepa_marketplace !== 'string') {
    return res.status(400).json({ success: false, message: 'Invalid Keepa marketplace provided' });
  }

  if (!google_marketplace || typeof google_marketplace !== 'string') {
    return res.status(400).json({ success: false, message: 'Invalid Google marketplace provided' });
  }

  try {
    const results = await runScrapingFlow(asins, keepa_marketplace,google_marketplace);
    return res.json({ success: true, message: 'ASINs processed successfully', data: results });
  } catch (err) {
    console.error("❌ Error in processing ASINs:", err.message);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

module.exports = router;

