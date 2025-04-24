const db = require("../models");
const Order = db.Order;
const OrderItem = db.OrderItem;
const Cart = db.Cart;

const checkoutCartWithSubscription = async (userId, body) => {
  const cartItems = await Cart.findAll({
    where: { creator_id: userId }
  });

  const orderItemsData = [];
  let total = 0;

  // 1. Traiter les items du panier
  for (const item of cartItems) {
    const itemAmount = 100; // ex: prix fixe ou récupéré dynamiquement
    const tax = 0;

    total += itemAmount;

    orderItemsData.push({
      user_id: userId,
      model_type: item.webinar_id
        ? "App\\Models\\Webinar"
        : "App\\Models\\ReserveMeeting",
      model_id: item.webinar_id || item.reserve_meeting_id,
      amount: itemAmount,
      tax,
      commission: 0,
      discount: 0,
      total_amount: itemAmount + tax,
      created_at: Date.now()
    });
  }

  // 2. Ajouter l'abonnement s'il est présent
  if (body.subscribe_id) {
    const subscribeAmount = body.amount || 150; // ou valeur dynamique
    const tax = 0;

    total += subscribeAmount;

    orderItemsData.push({
      user_id: userId,
      model_type: "App\\Models\\Subscribe",
      model_id: body.subscribe_id,
      amount: subscribeAmount,
      tax,
      commission: 0,
      discount: 0,
      total_amount: subscribeAmount + tax,
      created_at: Date.now()
    });
  }

  if (orderItemsData.length === 0) {
    throw new Error("Panier vide et aucune souscription détectée.");
  }

  // 3. Créer la commande
  const order = await Order.create({
    user_id: userId,
    status: "pending",
    payment_method: body.payment_method || "card",
    amount: total,
    tax: 0,
    total_discount: 0,
    total_amount: total,
    reference_id: null,
    created_at: Date.now()
  });

  // 4. Créer les order_items
  for (const item of orderItemsData) {
    await OrderItem.create({
      ...item,
      order_id: order.id
    });
  }

  // 5. Vider le panier
  await Cart.destroy({ where: { creator_id: userId } });

  return order;
};

module.exports = { checkoutCartWithSubscription };
