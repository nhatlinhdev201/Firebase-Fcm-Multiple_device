const express = require("express");
const { sendNotificationToTopicNetco, sendNotificationToTopicOvg } = require("../controllers/fcmNotificationTopicController");
const router = express.Router();

router.post('/send-notification-topic-netco', sendNotificationToTopicNetco);
router.post('/send-notification-topic-ovg', sendNotificationToTopicOvg);

module.exports = router