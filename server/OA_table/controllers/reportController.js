import { getAllReports, getReportById } from '../models/reportModel.js';

// @desc    Get all reports
// @route   GET /api/reports
// @access  Public

export const fetchAllReports = async (req, res) => {
    const { page = 1, limit = 9999 } = req.query;
        
    try {
        const reports = await getAllReports(parseInt(page), parseInt(limit));
        

        if (!reports || reports.length === 0) {
            return res.status(404).json({
                success: false,
                error: 'No data found in the database'
            });
        }

        res.status(200).json({
            success: true,
            page: parseInt(page),
            limit: parseInt(limit),
            data: reports
        });
    } catch (error) {
        console.error('❌ Controller Error:', error); // Debug Log
        res.status(500).json({
            success: false,
            error: 'Failed to fetch data from the database',
            details: error.message // Show detailed error for debugging
        });
    }
};

// @desc    Get report by ID
// @route   GET /api/reports/:id
// @access  Public
export const fetchReportById = async (req, res) => {
    const { id } = req.params;

    try {
        const report = await getReportById(id);

        if (!report) {
            return res.status(404).json({
                success: false,
                error: 'Report not found'
            });
        }

        res.status(200).json({
            success: true,
            data: report
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Failed to fetch data from the database'
        });
    }
};
