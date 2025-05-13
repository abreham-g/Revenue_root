const express = require('express');
const router = express.Router();

// ASIN submission endpoint
router.post('/submit-asins', (req, res) => {
    const { asins, keepa_marketplace, google_marketplace } = req.body;

    // Log incoming request
    console.log("🔥 Incoming Request: POST /api/submit-asins");
    
    // Check if ASINs, Keepa marketplace, and Google marketplace are provided
    if (!asins || !Array.isArray(asins) || asins.length === 0) {
        return res.status(400).json({ success: false, message: 'No ASINs provided' });
    }

    if (!keepa_marketplace || typeof keepa_marketplace !== 'string') {
        return res.status(400).json({ success: false, message: 'Invalid Keepa marketplace provided' });
    }

    if (!google_marketplace || typeof google_marketplace !== 'string') {
        return res.status(400).json({ success: false, message: 'Invalid Google marketplace provided' });
    }

    console.log("Received ASINs:", asins);
    console.log("Keepa Marketplace:", keepa_marketplace);
    console.log("Google Marketplace:", google_marketplace);

    return res.json({ success: true, message: 'ASINs submitted successfully' });
});

module.exports = router;