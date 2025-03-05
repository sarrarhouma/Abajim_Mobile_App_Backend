const Subscription = require("../models/Subscribes"); // This refers to subscription PLANS

const SubscribeService = {
  async subscribe(userId, subscribeId) {
    // Check if user has already subscribed to this plan
    const existingSubscription = await Subscription.findOne({ where: { id: subscribeId } });

    if (!existingSubscription) {
      return { error: "Subscription plan not found" };
    }

    return { message: `User ${userId} subscribed to plan ${subscribeId}` };
  },

  async getSubscriptions() {
    return await Subscription.findAll(); // Returns available subscription plans
  }
};

module.exports = SubscribeService;
