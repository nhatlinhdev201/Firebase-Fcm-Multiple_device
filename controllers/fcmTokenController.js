const { getAccessTokenNetco, getAccessTokenOvg } = require("../utils/getAccesstoken");

const getFcmTokenNetco = async (req, res) => {
    try {
        const accessToken = await getAccessTokenNetco();
        res.json({ access_token: accessToken });
    } catch (error) {
        console.error("Error getting access token:", error);
        res.status(500).json({ error: "Failed to get access token" });
    }
}

const getFcmTokenOvg = async (req, res) => {
    try {
        const accessToken = await getAccessTokenOvg();
        res.json({ access_token: accessToken });
    } catch (error) {
        console.error("Error getting access token:", error);
        res.status(500).json({ error: "Failed to get access token" });
    }
}

module.exports = { getFcmTokenNetco, getFcmTokenOvg }