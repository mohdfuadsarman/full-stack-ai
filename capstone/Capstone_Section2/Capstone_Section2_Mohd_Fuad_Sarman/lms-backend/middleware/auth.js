const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-here';

const getToken = (req) => {
    const authHeader = req.headers['authorization'];
    return authHeader?.split(' ')[1]; // Bearer TOKEN
};

// Require a valid token
const authenticateToken = (req, res, next) => {
    const token = getToken(req);
    if (!token) return res.status(401).json({ message: 'Access token is required' });

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: 'Invalid or expired token' });
        req.user = user;
        next();
    });
};

// Require specific role(s)
const requireRole = (roles) => (req, res, next) => {
    if (!req.user) return res.status(401).json({ message: 'Authentication required' });

    const allowed = Array.isArray(roles) ? roles : [roles];
    if (!allowed.includes(req.user.role)) {
        return res.status(403).json({ message: `Access denied. Required: ${allowed.join(', ')}` });
    }

    next();
};

// Optional authentication (e.g., public routes)
const optionalAuth = (req, res, next) => {
    const token = getToken(req);
    if (token) {
        jwt.verify(token, JWT_SECRET, (err, user) => {
            if (!err) req.user = user;
            next();
        });
    } else {
        next();
    }
};

module.exports = { authenticateToken, requireRole, optionalAuth };
