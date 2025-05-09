// const express = require("express");
// const passport = require("passport");
// const { register, login, logout, googleAuthCallback, getUser } = require("../controllers/authController");

// const router = express.Router();

// router.post("/register", register);
// router.post("/login", login);
// router.post("/logout", logout);
// router.get("/user", getUser);

// // ✅ Google OAuth Routes
// router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

// router.get("/google/callback", passport.authenticate("google", { failureRedirect: "/login" }), googleAuthCallback);

// module.exports = router;

const express = require("express");
const passport = require("passport");
const { register, login, logout, googleAuthCallback, getUser } = require("../controllers/authController");
const { fetchGWSData } = require("../services/gwsService"); // ✅ Import your GWS fetch function

const router = express.Router();

// 🟢 Auth Routes
router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/user", getUser);

// 🟢 Google OAuth Routes
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));
router.get("/google/callback", passport.authenticate("google", { failureRedirect: "/login" }), googleAuthCallback);

// 🟢 GWS Fetch Route
router.get('/fetch', async (req, res) => {
  try {
    const data = await fetchGWSData();
    res.status(200).json(data); // ✅ send back the formattedData
  } catch (err) {
    console.error("Error in /fetch route:", err);
    res.status(500).json({ message: 'Error fetching GWS data' });
  }
});

module.exports = router;

