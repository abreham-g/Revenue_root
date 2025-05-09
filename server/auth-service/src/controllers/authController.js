const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const prisma = require("../config/db.js");

dotenv.config();

const register = async (req, res) => {
  console.log("🚀 Registration Attempt");
  console.log("📩 Request Body:", req.body);

  const { email, password, role } = req.body;

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      console.log("❌ User already exists");
      return res.status(400).json({ message: "User already exists" });
    }

    console.log("🔑 Hashing password...");
    const hashedPassword = await bcrypt.hash(password, 10);

    console.log("🛠 Creating new user in database...");
    const newUser = await prisma.user.create({
      data: {
        email,
        role: role || "USER",
        password: hashedPassword,
      },
    });

    console.log("✅ User registered successfully:", newUser);
    res.status(201).json({ message: "User registered successfully", user: newUser });
  } catch (err) {
    console.error("❌ Registration Error:", err);
    res.status(500).json({ error: err.message });
  }
};


// ✅ Login User and Store JWT Session in DB
const login = async (req, res) => {
  console.log("🚀 Login Attempt");
  console.log("📩 Request Body:", req.body);

  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      console.log("❌ User not found");
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("❌ Password does not match");
      return res.status(400).json({ message: "Invalid credentials" });
    }

    console.log("✅ User authenticated:", user);

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    await prisma.session.create({
      data: {
        sessionToken: token,
        userId: user.id,
        expires: new Date(Date.now() + 3600000), // 1-hour expiry
      },
    });

    console.log("✅ Login Successful! Sending token...");
    res.json({ token, role: user.role, userId: user.id });
  } catch (err) {
    console.error("❌ Login Error:", err);
    res.status(500).json({ error: err.message });
  }
};

// ✅ Logout User (Delete Session from DB)
const logout = async (req, res) => {
  try {
    const { token } = req.body;

    await prisma.session.deleteMany({
      where: { sessionToken: token },
    });

    res.json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error logging out" });
  }
};

// ✅ Google OAuth Authentication
const googleAuthCallback = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(400).json({ message: "Google authentication failed" });
    }

    const { token, user } = req.user;

    res.redirect(`http://localhost:3000/auth?token=${token}&role=${user.role}&userId=${user.id}`);
  } catch (error) {
    res.status(500).json({ error: "Google Authentication Error" });
  }
};

// ✅ Get User Info (Optional API)
const getUser = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: { id: true, email: true, role: true, name: true },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Error fetching user data" });
  }
};

module.exports = {
  register,
  login,
  logout,
  googleAuthCallback,
  getUser,
};
