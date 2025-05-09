import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const connectDB = async () => {
    try {
        await prisma.$connect();
        console.log('✅ Database connected successfully!');
    } catch (error) {
        console.error('❌ Database connection error:', error);
        process.exit(1); // Exit process with failure
    }
};

export { prisma, connectDB };  // ✅ Named export
