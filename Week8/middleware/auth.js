const jwt = require('jsonwebtoken');

const authenticateUser = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Extract token from 'Bearer <token>'

    if (!token) return res.sendStatus(401); // Unauthorized if no token is found

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403); // Forbidden if token is invalid
        req.user = user; // Attach the decoded user to the request object
        next();
    });
};

const authenticateAdmin = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) return res.status(403).json({ message: 'No token provided' });

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            console.error('Token verification error:', err);
            return res.status(500).json({ message: 'Failed to authenticate token' });
        }
        
        console.log('Decoded token:', decoded); // Log the decoded token for debugging

        if (decoded.role !== 'admin') return res.status(403).json({ message: 'Not authorized' });
        req.user = decoded;
        next();
    });
};


module.exports = { authenticateUser, authenticateAdmin };
