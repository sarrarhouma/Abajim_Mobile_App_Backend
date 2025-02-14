const manuelService = require("../services/manuelService");

/**
 * 🔹 Récupérer la liste de tous les manuels scolaires disponibles
 */
exports.getAllManuels = async (req, res) => {
    try {
        const manuels = await manuelService.getAllManuels();
        res.status(200).json(manuels);
    } catch (error) {
        console.error("❌ Erreur dans getAllManuels :", error);
        res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
};

/**
 * 🔹 Récupérer un manuel spécifique avec ses documents et vidéos
 */
exports.getManuelById = async (req, res) => {
    try {
        const manuel = await manuelService.getManuelById(req.params.id);

        if (!manuel) return res.status(404).json({ message: "Manuel non trouvé" });

        res.status(200).json(manuel);
    } catch (error) {
        console.error("❌ Erreur dans getManuelById :", error);
        res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
};
