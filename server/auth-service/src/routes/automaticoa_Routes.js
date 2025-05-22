// routes/gwsRoutes.js
const express = require("express");
const { fetchGWSData } = require("../services/automatic_oa");

const router = express.Router();

router.get('/automatic_oa', async (req, res) => {
  try {
    const data = await fetchGWSData();
    res.status(200).json(data);
  } catch (err) {
    console.error("Error in /automatic_oa route:", err);
    res.status(500).json({ message: 'Error fetching automatic oa data' });
  }
});

module.exports = router;
