const express = require('express');
const router = express.Router();
const LikeController = require('../controllers/likeController');
const authenticateToken = require('../config/middleware/authMiddleware'); // Ensure user is authenticated

// Route for toggling like (like/unlike)
router.post('/toggle/:id', authenticateToken, LikeController.likeWebinar);

module.exports = router;
