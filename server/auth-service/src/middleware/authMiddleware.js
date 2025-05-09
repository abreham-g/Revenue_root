const jwt = require("jsonwebtoken");
const prisma = require("../config/db.js");
const dotenv = require("dotenv");

dotenv.config();

const authMiddleware = async (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        const session = await prisma.session.findUnique({
            where: { sessionToken: token },
        });

        if (!session || new Date(session.expires) < new Date()) {
            return res.status(401).json({ message: "Session expired. Please login again." });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid token" });
    }
};

module.exports = authMiddleware;
