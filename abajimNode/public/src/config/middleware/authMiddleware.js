const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Assuming User model is in models/User.js
const SECRET_KEY = process.env.SECRET_KEY || 'your_secret_key'; // You should load this from .env

// Middleware to check if the user is authenticated
const authenticateToken = (req, res, next) => {
  // Get token from header
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(403).json({ error: 'Access denied, token missing!' });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded; // Add the decoded user info to the request object

    // Optionally, you can fetch the user from the database using the decoded ID (if you want to populate user details)
    // const user = await User.findByPk(decoded.id); // Uncomment this if needed

    next(); // If the token is valid, proceed to the next middleware or route handler
  } catch (error) {
    return res.status(401).json({ error: 'Invalid or expired token.' });
  }
};

module.exports = { authenticateToken };
