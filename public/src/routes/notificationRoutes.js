const express = require('express');
const router = express.Router();
const NotificationController = require('../controllers/NotificationController');

// Envoyer une notification à un enfant
router.post('/child/send', NotificationController.sendToChild);

// Voir toutes les notifications d'un enfant
router.get('/child/:userId', NotificationController.getChildNotifications);

// Marquer comme lue
router.post('/child/seen', NotificationController.markNotificationAsSeen);

// Supprimer une notification
router.delete('/child/:id', NotificationController.deleteNotification);

module.exports = router;
