import { prisma } from '../config/db.js';  // ✅ Ensure it's a named import

export const getAllReports = async (page, limit) => {
    try {
        const reports = await prisma.SFS_REPORT.findMany({   // ✅ Correct model reference
            skip: (page - 1) * limit,
            take: limit,
        });

        return reports;
    } catch (error) {
        console.error('❌ Error fetching reports:', error);
        throw error;
    }
};

// Fetch a single record by ID
// correct
export const getReportById = async (id) => {
    try {
        const report = await prisma.sFS_REPORT.findUnique({
            where: { id: parseInt(id) }
        });

        console.log('✅ Single report fetched:', report);
        return report;
    } catch (error) {
        console.error('❌ Error fetching report by ID:', error.message);
        throw error;
    }
};
