const express = require("express");
const SubscribeController = require("../controllers/SubscribeController");
const authenticateToken = require('../config/middleware/authMiddleware');

const router = express.Router();

// Subscribe to a plan (NO user_id in the DB, just a simulated action)
router.post("/:subscribeId", authenticateToken, SubscribeController.subscribePlan);

// Get available subscription plans
router.get("/", SubscribeController.getSubscriptionPlans);

module.exports = router;
