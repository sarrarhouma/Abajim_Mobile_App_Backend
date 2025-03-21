const NotificationService = require('../services/NotificationService');

module.exports = {
  async sendToChild(req, res) {
    try {
      const { child_id, title, message, data, sender_id } = req.body;

      const notification = await NotificationService.sendNotification({
        user_id: child_id,
        title,
        message,
        data,
        sender_id
      });

      res.status(201).json(notification);
    } catch (error) {
      console.error("NotificationController error:", error);
      res.status(500).json({ error: error.message });
    }
  },

  async getChildNotifications(req, res) {
    try {
      const { userId } = req.params;
      const notifications = await NotificationService.getNotifications(userId);
      res.status(200).json(notifications);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async markNotificationAsSeen(req, res) {
    try {
      const { user_id, notification_id } = req.body;
      await NotificationService.markAsSeen(user_id, notification_id);
      res.status(200).json({ success: true });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async deleteNotification(req, res) {
    try {
      const { userId } = req.body;
      const { id } = req.params;
      await NotificationService.deleteNotification(userId, id);
      res.status(200).json({ success: true });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};
