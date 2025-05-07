const subscriptionService = require("../services/subscriptionService");
const db = require("../models");
const User = db.User;
const { Order, OrderItem, CardReservation, PaymentProof } = require("../models");


exports.subscribe = async (req, res) => {
  try {
    const {
      subscribe_id,
      amount,
      payment_method,
      tax,
      phone,
      address,
      enfant_id
    } = req.body;

    const userId = req.user.id; // Parent ID
    const parentName = req.user.full_name; // Nom du parent
    const parentPhone = phone; // Numéro saisi
    const proof_file = req.file?.filename || null; // 📎 Nom du fichier uploadé

    // 🔸 Validation minimale
    if (!subscribe_id || !amount || !payment_method || !enfant_id) {
      return res.status(400).json({ message: "Données obligatoires manquantes (pack, montant, méthode, enfant)." });
    }

    // 🔸 Pack spécifique
    if (parseInt(subscribe_id) !== 3) {
      return res.status(403).json({ message: "Seul le pack الكرطابلة est autorisé dans cette opération." });
    }

    // 🔸 Vérification de l’enfant
    const enfant = await User.findByPk(enfant_id);
    if (!enfant) {
      return res.status(404).json({ message: "Enfant non trouvé." });
    }

    const level_id = enfant.level_id;

    // 🔸 Paiement cash
    if (payment_method === "cash") {
      if (!parentPhone || !address || !parentName || !level_id) {
        return res.status(400).json({
          message: "Téléphone, adresse, nom du parent et niveau de l’enfant requis pour le paiement à la livraison.",
        });
      }
    }

    // 🔸 Paiement bancaire
    if (payment_method === "bank" && !proof_file) {
      return res.status(400).json({
        message: "Preuve de paiement requise pour le virement bancaire.",
      });
    }

    // 🔥 Appel du service
    const order = await subscriptionService.subscribeToPack(
      userId,
      parseInt(subscribe_id),
      parseFloat(amount),
      parseFloat(tax) || 0,
      payment_method,
      parentPhone,
      address,
      proof_file,
      parentName,
      level_id,
      parseInt(enfant_id)
    );

    return res.status(201).json({
      message: "Souscription enregistrée avec succès.",
      order_id: order.id,
    });

  } catch (error) {
    console.error("❌ Erreur lors de la souscription :", error);
    return res.status(500).json({ message: "Erreur serveur lors de la souscription." });
  }
};
exports.checkChildSubscription = async (req, res) => {
  try {
    const parentId = req.user.id;
    const { childId } = req.params;

    // 🔍 Vérifier si abonnement existe dans Order pour ce parent
    const hasActiveSubscription = await Order.findOne({
      where: {
        user_id: parentId,
        status: "pending",  // ✅ Fixed
      }
    });

    // 🔍 Vérifier si carte reservée pour cet enfant
    const cardReservation = await CardReservation.findOne({
      where: {
        enfant_id: childId
      },
      order: [['created_at', 'DESC']]
    });

    // 🔍 Vérifier si virement bancaire pour cet enfant
    const paymentProof = await PaymentProof.findOne({
      where: {
        user_id: childId
      },
      order: [['created_at', 'DESC']]
    });

// ✅ Calculer subscription_active proprement
let subscription_active = false;

if (cardReservation && cardReservation.status === "approved") {
  subscription_active = true;
} else if (paymentProof && paymentProof.status === "approved") {
  subscription_active = true;
}

res.status(200).json({
  child_id: childId,
  subscription_active,
  card_ordered: !!cardReservation,
  card_status: cardReservation ? cardReservation.status : null,
  bank_transfer: !!paymentProof,
  parent_transfer_status: paymentProof ? paymentProof.status : null
});


  } catch (error) {
    console.error("❌ Erreur lors de la vérification d’abonnement enfant :", error);
    res.status(500).json({ message: "Erreur serveur." });
  }
};
