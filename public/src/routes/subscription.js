const express = require("express");
const router = express.Router();
const subscriptionController = require("../controllers/subscriptionController");
const authenticateWithFullUser = require("../config/middleware/userMiddleware");
//const authenticateTokenChild = require("../config/middleware/authenticateTokenChild");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/proofs");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// POST /api/subscription/subscribe
router.post( "/subscribe", authenticateWithFullUser,upload.single("proof_file"),subscriptionController.subscribe);
// get status of the card 
//router.get("/status/:id", authenticateTokenChild, subscriptionController.getSubscriptionStatus);

module.exports = router;
