const NotificationService = require('../services/NotificationService');

const NotificationController = {

  // 📩 Envoyer une notification personnalisée à un enfant
  async sendToChild(req, res) {
    try {
      const { child_id, title, message, data, sender_id } = req.body;
// Envoyer notification si carte en attente
if (cardReservation && cardReservation.status === "waiting") {
  await NotificationService.sendNotification({
    user_id: child.id,
    title: "بطاقة الاشتراك",
    message: "بطاقتك قيد التوصيل، ستصلك قريباً."
  });
}

// Envoyer notification si virement en attente
if (paymentProof && paymentProof.status === "pending") {
  await NotificationService.sendNotification({
    user_id: child.id,
    title: "التحويل البنكي",
    message: "تحويلك البنكي قيد التحقق، سيتم تفعيل اشتراكك قريباً."
  });
}
      const notification = await NotificationService.sendNotification({
        user_id: child_id,
        title,
        message,
        data,
        sender_id
      });

      res.status(201).json(notification);
    } catch (error) {
      console.error("❌ Erreur lors de l'envoi de la notification :", error);
      res.status(500).json({ error: error.message });
    }
  },

  // 📩 Envoyer une notification automatique pour un nouveau meeting
  async sendNewMeetingNotification(req, res) {
    try {
      const { teacherId, meetingTitle } = req.body;

      await NotificationService.sendNewMeetingNotification(teacherId, meetingTitle);

      res.status(201).json({ message: 'Notification de nouveau meeting envoyée.' });
    } catch (error) {
      console.error("❌ Erreur lors de l'envoi de la notification Meeting :", error);
      res.status(500).json({ error: error.message });
    }
  },

  // 📩 Envoyer une notification automatique pour un nouveau webinar
  async sendNewWebinarNotification(req, res) {
    try {
      const { teacherId, webinarTitle } = req.body;

      await NotificationService.sendNewWebinarNotification(teacherId, webinarTitle);

      res.status(201).json({ message: 'Notification de nouveau webinar envoyée.' });
    } catch (error) {
      console.error("❌ Erreur lors de l'envoi de la notification Webinar :", error);
      res.status(500).json({ error: error.message });
    }
  },

  // 📩 Envoyer une notification pour nouveau pack
  async sendNewPackNotification(req, res) {
    try {
      const { userId, packName } = req.body;

      await NotificationService.sendNewPackNotification(userId, packName);

      res.status(201).json({ message: 'Notification de nouveau pack envoyée.' });
    } catch (error) {
      console.error("❌ Erreur lors de l'envoi de la notification Pack :", error);
      res.status(500).json({ error: error.message });
    }
  },

  // 📩 Envoyer automatiquement les notifications pour meetings qui commencent bientôt
  async sendMeetingsStartingSoon(req, res) {
    try {
      await NotificationService.sendMeetingStartingSoonNotifications();

      res.status(200).json({ message: 'Notifications envoyées pour meetings proches.' });
    } catch (error) {
      console.error("❌ Erreur lors de la notification des meetings proches :", error);
      res.status(500).json({ error: error.message });
    }
  },

  // 🔎 Récupérer toutes les notifications d'un enfant
  async getChildNotifications(req, res) {
    try {
      const { userId } = req.params;
      const notifications = await NotificationService.getNotifications(userId);

      res.status(200).json(notifications);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // 👁️ Marquer une notification comme lue
  async markNotificationAsSeen(req, res) {
    try {
      const { user_id, notification_id } = req.body;

      await NotificationService.markAsSeen(user_id, notification_id);

      res.status(200).json({ success: true });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // 🗑️ Supprimer une notification
async deleteNotification(req, res) {
  try {
    const { userId, id } = req.params; 

    await NotificationService.deleteNotification(userId, id); 

    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Erreur lors de la suppression de la notification :", error.message);
    res.status(500).json({ error: error.message });
  }
}

};

module.exports = NotificationController;
