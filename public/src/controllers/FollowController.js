const FollowService = require("../services/FollowService");

const FollowController = {
  async subscribe(req, res) {
    try {
      const { follower, user_id } = req.body;
      const result = await FollowService.subscribe(follower, user_id);
      res.json(result);
    } catch (err) {
      console.error("❌ Erreur d'abonnement :", err);
      res.status(500).json({ error: "Erreur serveur" });
    }
  },

  async unsubscribe(req, res) {
    try {
      const { follower, user_id } = req.body;
      await FollowService.unsubscribe(follower, user_id);
      res.json({ message: "Désabonnement réussi" });
    } catch (err) {
      console.error("❌ Erreur de désabonnement :", err);
      res.status(500).json({ error: "Erreur serveur" });
    }
  },

  async isFollowing(req, res) {
    try {
      const { follower, user_id } = req.params;
      const result = await FollowService.isFollowing(follower, user_id);
      res.json({ isFollowing: result });
    } catch (err) {
      res.status(500).json({ error: "Erreur serveur" });
    }
  },

  async getUserSubscriptions(req, res) {
    try {
      const { follower } = req.params;
      const result = await FollowService.getSubscriptionsByUser(follower);
      res.json(result);
    } catch (err) {
      res.status(500).json({ error: "Erreur serveur" });
    }
  },

  async getFollowersCount(req, res) {
    try {
      const { user_id } = req.params;
      const count = await FollowService.countFollowers(user_id);
      res.json({ user_id, followers: count });
    } catch (err) {
      res.status(500).json({ error: "Erreur serveur" });
    }
  },
};

module.exports = FollowController;
