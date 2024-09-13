const express = require("express");
const { getFcmTokenOvg, getFcmTokenNetco } = require("../controllers/fcmTokenController");
const router = express.Router();

router.get("/get-fcm-token-ovg",getFcmTokenOvg);

router.get("/get-fcm-token-netco", getFcmTokenNetco);

module.exports = router