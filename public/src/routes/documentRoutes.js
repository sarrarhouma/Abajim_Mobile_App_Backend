const express = require("express");
const router = express.Router();
const documentController = require("../controllers/documentController");

router.get("/", documentController.getAllDocuments);
router.get("/manuel/:manuel_id", documentController.getDocumentsByManuel);
router.post("/add", documentController.createDocument);

module.exports = router;
