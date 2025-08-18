const jwt = require('jsonwebtoken');
const authMiddleware = (req, res, next) => {
    const authHeader = req.header('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ msg: 'Access denied. No token provided.' });
    }
    const token = authHeader.split(' ')[1]; // Extract actual token
    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified.userId; // Attach user ID to request
        next();
    }
    catch (err) {
        console.error("JWT verification failed:", err);
        res.status(401).json({ msg: 'Invalid token' });
    }
};
module.exports = authMiddleware;
export {};
//# sourceMappingURL=authMiddleware.js.map