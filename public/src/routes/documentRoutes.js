const express = require("express");
const router = express.Router();
const documentController = require("../controllers/documentController");

router.get("/", documentController.getAllDocuments);
router.get("/manuel/:manuel_id", documentController.getDocumentsByManuel);
router.post("/add", documentController.createDocument);

// 🆕 New route to fetch the correction video URL
router.get("/correction-video/:manuel_id/:icon/:page", documentController.getCorrectionVideoUrl);
module.exports = router;
