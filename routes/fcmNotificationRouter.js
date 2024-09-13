const express = require("express");
const { sendFcmNotificationToMultiplpeDeviceNetco, sendFcmNotificationToMultiplpeDeviceOvg } = require("../controllers/fcmNotificationController");
const router = express.Router();

router.post('/send-notification-netco', sendFcmNotificationToMultiplpeDeviceNetco);
router.post('/send-notification-ovg', sendFcmNotificationToMultiplpeDeviceOvg);

module.exports = router