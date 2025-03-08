const SubscribeService = require("../services/subscribeService");

const SubscribeController = {
  async subscribePlan(req, res) {
    try {
      const userId = req.user.id; // Get user from authentication middleware
      const subscribeId = req.params.subscribeId;

      const result = await SubscribeService.subscribe(userId, subscribeId);
      res.json(result);
    } catch (error) {
      console.error("❌ Error subscribing:", error);
      res.status(500).json({ error: "Erreur serveur" });
    }
  },

  async getSubscriptionPlans(req, res) {
    try {
      const subscriptions = await SubscribeService.getSubscriptions();
      res.json(subscriptions);
    } catch (error) {
      console.error("❌ Error fetching subscriptions:", error);
      res.status(500).json({ error: "Erreur serveur" });
    }
  }
};

module.exports = SubscribeController;
