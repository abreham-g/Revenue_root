// routes/gwsRoutes.js
const express = require("express");
const { fetchGWSData } = require("../services/gwsService");

const router = express.Router();

router.get('/fetch', async (req, res) => {
  try {
    const data = await fetchGWSData();
    res.status(200).json(data);
  } catch (err) {
    console.error("Error in /fetch route:", err);
    res.status(500).json({ message: 'Error fetching GWS data' });
  }
});

module.exports = router;
