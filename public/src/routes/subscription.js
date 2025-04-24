const express = require("express");
const router = express.Router();
const subscriptionController = require("../controllers/subscriptionController");
const authenticateToken = require("../config/middleware/authMiddleware");

router.post("/subscribe", authenticateToken, subscriptionController.subscribe);

module.exports = router;
