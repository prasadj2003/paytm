

const { JWT_SECRET } = require("./config");
const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        console.log("Authorization header missing or malformed");
        return res.status(403).json({ error: "Authorization header missing or malformed" });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        console.log("Token decoded:", decoded);

        // Ensure the token contains userId
        if (!decoded.userId) {
            console.log("userId not found in token payload");
            return res.status(403).json({ error: "Invalid token payload" });
        }

        req.body.userId = decoded.userId; // can contain potential error can be req.body.userId
        next();
    } catch (err) {
        console.error("JWT verification failed:", err.message);
        return res.status(403).json({ error: "Invalid or expired token" });
    }
};

module.exports = {
    authMiddleware
};
