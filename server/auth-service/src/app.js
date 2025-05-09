const express = require("express");
const session = require("express-session");
const passport = require("passport");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const gwsRoutes = require("./routes/gwsRoutes"); // ✅ fixed import
require("./config/passport");

const app = express();

// CORS Configuration - Moved to the top
const allowedOrigins = [
    'http://localhost:3000',  
    'http://localhost:5000/gws/fetch',     // Local dev environment
    'http://localhost:5173',       // Another local dev port
    'https://revenu-analysis-report-448061736903.us-central1.run.app'
];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: "GET,POST,PUT,DELETE,OPTIONS",
    allowedHeaders: "Content-Type,Authorization",
    credentials: true
}));

// Middleware to log incoming requests
app.use((req, res, next) => {
    console.log(`🔥 Incoming Request: ${req.method} ${req.path}`);
    next();
});

// CORS Preflight Handling
app.options("*", (req, res) => {
    res.header("Access-Control-Allow-Origin", req.headers.origin || "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.header("Access-Control-Allow-Credentials", "true");
    res.sendStatus(200);  // Send preflight response
});

// Session & Passport
app.use(session({ secret: "secret", resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/api/auth", authRoutes);
app.use("/gws", gwsRoutes); // ✅ correct now

module.exports = app;
