const express = require("express");
const WebinarController = require("../controllers/WebinarController");
const LikeController = require("../controllers/LikeController");

const router = express.Router();
// ✅ Route pour ajouter un webinar
router.post("/add", WebinarController.createWebinar);
// ✅ Route pour récupérer tous les webinaires
router.get("/", WebinarController.getAllWebinars);
// ✅ Route pour récupérer un webinar par son ID
router.get("/:id", WebinarController.getWebinarById);
// ✅ Route pour liker un webinar
router.post("/:id/like", LikeController.likeWebinar);
// ✅ Route pour récupérer les webinaires par niveau
router.get("/level/:levelId", WebinarController.getWebinarsByLevel);

module.exports = router;
