const WebinarService = require("../services/WebinarService");

const WebinarController = {

  // Get All
  async getAllWebinars(req, res) {
    try {
      const webinars = await WebinarService.getAll();
      res.json(webinars);
    } catch (error) {
      console.error("❌ Error fetching webinars:", error);
      res.status(500).json({ error: "Erreur serveur" });
    }
  },

  // Get by ID
  async getWebinarById(req, res) {
    try {
      const webinar = await WebinarService.getById(req.params.id);
      if (!webinar) return res.status(404).json({ error: "Webinar non trouvé" });
      res.json(webinar);
    } catch (error) {
      console.error("❌ Erreur lors de la récupération du webinar:", error);
      res.status(500).json({ error: "Erreur serveur" });
    }
  },

  // Get by Level
  async getWebinarsByLevel(req, res) {
    try {
      const levelId = req.params.levelId;
      const webinars = await WebinarService.getByLevelId(levelId);
      res.json(webinars);
    } catch (error) {
      console.error("❌ Error fetching webinars by level:", error);
      res.status(500).json({ error: "Erreur serveur" });
    }
  },
// ✅ WebinarController.js
async searchWebinars(req, res) {
  try {
    const { query, level_id } = req.query;
    const webinars = await WebinarService.searchWebinars(query, level_id);

    if (!webinars || webinars.length === 0) {
      return res.status(404).json({ error: "Webinar non trouvé" });
    }

    res.json(webinars);
  } catch (error) {
    console.error("❌ Error in searchWebinars:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
}




};

module.exports = WebinarController;
