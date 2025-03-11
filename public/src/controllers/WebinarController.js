const WebinarService = require("../services/WebinarService");

const WebinarController = {
  // Create
  // async createWebinar(req, res) {
  //   try {
  //     const newWebinar = await WebinarService.create(req.body);
  //     res.status(201).json(newWebinar);
  //   } catch (error) {
  //     console.error("❌ Error creating webinar:", error);
  //     res.status(500).json({ error: "Erreur serveur lors de l'ajout du webinar." });
  //   }
  // },

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
  }
};

module.exports = WebinarController;
