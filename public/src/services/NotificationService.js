const { Notification, NotificationStatus } = require('../models');

module.exports = {
  async sendNotification({ user_id, title, message, data = {}, sender_id = null }) {
    const created_at = Date.now();

    const notification = await Notification.create({
      user_id,
      sender_id,
      group_id: null,
      title,
      message,
      sender: sender_id !== null ? 'user' : 'system',
      type: 'single',
      data,
      created_at
    });

    await NotificationStatus.create({
      user_id,
      notification_id: notification.id,
      seen_at: null
    });

    return notification;
  },

  async getNotifications(user_id) {
    return await Notification.findAll({
      where: { user_id },
      order: [['created_at', 'DESC']],
      include: [
        {
          model: NotificationStatus,
          as: 'statuses',
          where: { user_id },
          required: false
        }
      ]
    });
  },

  async markAsSeen(user_id, notification_id) {
    const existing = await NotificationStatus.findOne({
      where: { user_id, notification_id }
    });

    if (existing) {
      return await NotificationStatus.update(
        { seen_at: Date.now() },
        { where: { user_id, notification_id } }
      );
    } else {
      return await NotificationStatus.create({
        user_id,
        notification_id,
        seen_at: Date.now()
      });
    }
  },

  async deleteNotification(user_id, notification_id) {
    await NotificationStatus.destroy({ where: { user_id, notification_id } });
    return await Notification.destroy({ where: { id: notification_id, user_id } });
  }
};
