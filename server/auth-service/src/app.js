const express = require("express");
const session = require("express-session");
const passport = require("passport");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const gwsRoutes = require("./routes/gwsRoutes");
const manualoaRoutes = require("./routes/manualoa_Routes");
const automaticoaRouts= require("./routes/automaticoa_Routes")
require("./config/passport");

const app = express();

// CORS Configuration - Moved to the top
const allowedOrigins = [
    'http://localhost:3000',  
    'http://localhost:5173',  
    'http://localhost:5000/api/submit-asins',
    'https://revenue-root-1.onrender.com/api/submit-asins',       
    'https://revenue-analysis-b36kwxwus-abreham-gs-projects.vercel.app'
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
    res.sendStatus(200);  
});

// Session & Passport
app.use(session({ secret: "secret", resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Middleware to parse JSON body
app.use(express.json());


// Routes
app.use("/api",manualoaRoutes);
app.use("/api/auth", authRoutes);
app.use("/gws", gwsRoutes); 
app.use("/data",automaticoaRouts);

module.exports = app;
