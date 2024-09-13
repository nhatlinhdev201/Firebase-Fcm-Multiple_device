const { JWT } = require('google-auth-library');

// Hàm lấy access token từ service account
const getAccessTokenOvg = () => {
    return new Promise(function (resolve, reject) {
        const key = require('../config/serviceAccount-ovg.json');
        const jwtClient = new JWT(
            key.client_email,
            null,
            key.private_key,
            ["https://www.googleapis.com/auth/cloud-platform"],
            null
        );
        jwtClient.authorize(function (err, tokens) {
            if (err) {
                reject(err);
                return;
            }
            resolve(tokens.access_token);
        });
    });
};

const getAccessTokenNetco = () => {
    return new Promise(function (resolve, reject) {
        const key = require('../config/serviceAccount-netco.json');
        const jwtClient = new JWT(
            key.client_email,
            null,
            key.private_key,
            ["https://www.googleapis.com/auth/cloud-platform"],
            null
        );
        jwtClient.authorize(function (err, tokens) {
            if (err) {
                reject(err);
                return;
            }
            resolve(tokens.access_token);
        });
    });
};

module.exports = { getAccessTokenOvg, getAccessTokenNetco }