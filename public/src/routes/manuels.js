const express = require("express");
const router = express.Router();
const { getAllManuels, getManuelById } = require("../controllers/manuelController");

// 📌 Récupérer tous les manuels disponibles
router.get("/", getAllManuels);

// 📌 Récupérer un manuel spécifique avec ses documents et vidéos
router.get("/:id", getManuelById);

module.exports = router;
