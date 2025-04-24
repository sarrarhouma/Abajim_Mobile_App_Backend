const db = require("../models");
const Order = db.Order;
const OrderItem = db.OrderItem;

const subscribeToPack = async (userId, subscribeId, amount, tax) => {
  const order = await Order.create({
    user_id: userId,
    status: 'pending',
    payment_method: 'card', // ou autre selon méthode
    amount: amount,
    tax: tax,
    total_discount: 0,
    total_amount: amount + tax,
    reference_id: null,
    created_at: Date.now()
  });

  await OrderItem.create({
    user_id: userId,
    order_id: order.id,
    model_type: "App\\Models\\Subscribe",
    model_id: subscribeId,
    amount: amount,
    tax: tax,
    commission: 0,
    discount: 0,
    total_amount: amount + tax,
    created_at: Date.now()
  });

  return order;
};

module.exports = { subscribeToPack };
