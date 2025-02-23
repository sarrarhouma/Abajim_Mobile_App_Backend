const express = require("express");
const router = express.Router();
const enfantController = require("../controllers/enfantController");
const authenticateToken = require("../config/middleware/authMiddleware");

// ✅ Get all children for authenticated parent
router.get("/", authenticateToken, enfantController.getChildrenByParent);
// ✅ Get all children by a specific parent ID (For Admins)
router.get("/parent/:id", authenticateToken, enfantController.getChildrenByParentId);
// ✅ Add a new child
router.post("/add", authenticateToken, enfantController.addChild);

// ✅ Update an existing child
router.put("/update/:id", authenticateToken, enfantController.updateChild);

// ✅ Delete a child
router.delete("/delete/:id", authenticateToken, enfantController.deleteChild);

module.exports = router;
