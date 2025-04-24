const subscriptionService = require("../services/subscriptionService");

exports.subscribe = async (req, res) => {
  try {
    const { subscribe_id, amount, tax } = req.body;

    if (!subscribe_id || !amount) {
      return res.status(400).json({ message: "Données manquantes" });
    }

    const order = await subscriptionService.subscribeToPack(
      req.user.id,
      subscribe_id,
      amount,
      tax || 0
    );

    res.status(201).json({ message: "Souscription en cours", order_id: order.id });
  } catch (error) {
    console.error("Erreur de souscription :", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};
