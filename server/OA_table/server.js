import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'; // Import CORS
import {connectDB} from './config/db.js';
import reportRoutes from './routes/reportRoutes.js';

// Initialize environment variables
dotenv.config();

// Connect Database
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
const allowedOrigins = ['https://revenue-roots.vercel.app', 'https://revenue-roots.onrender.com' , 'https://revenue-analysis-9jmy40rv6-abreham-gs-projects.vercel.app'];
app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET'],                // Allow only GET requests
    credentials: true                // Allow cookies, tokens, etc.
}));
app.use(express.json());

// Routes
app.use('/api/reports', reportRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
});

// Start server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
