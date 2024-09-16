const express = require("express");
const { getFcmTokenOvg, getFcmTokenNetco } = require("../controllers/fcmTokenController");
const router = express.Router();

router.get("/get-access-token-ovg",getFcmTokenOvg);

router.get("/get-access-token-netco", getFcmTokenNetco);

module.exports = router