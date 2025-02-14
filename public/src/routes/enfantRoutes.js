const express = require("express");
const router = express.Router();
const enfantController = require("../controllers/enfantController");
const authenticateToken = require("../config/middleware/authMiddleware");



router.post("/add", authenticateToken, enfantController.addEnfant);
router.put("/update/:id", authenticateToken, enfantController.updateEnfant);
router.delete("/delete/:id", authenticateToken, enfantController.deleteEnfant);

module.exports = router;
