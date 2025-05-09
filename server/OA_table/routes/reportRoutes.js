import express from 'express';
import { fetchAllReports, fetchReportById } from '../controllers/reportController.js';

const router = express.Router();

// Routes
router.get('/', fetchAllReports);
router.get('/:id', fetchReportById);

export default router;
