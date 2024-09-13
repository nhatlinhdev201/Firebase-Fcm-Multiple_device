const fcmV1Http2 = require('fcm-v1-http2');
const path = require('path');
const fs = require('fs');

const serviceAccountPath = path.join(__dirname, '../config/serviceAccount-ovg.json');
const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'));


const client = new fcmV1Http2({
    serviceAccount,
  maxConcurrentConnections: 10, // số kết nối HTTP/2 tối đa
  maxConcurrentStreamsAllowed: 100, // số stream tối đa mỗi kết nối
});

const sendMulticastMessageOvg = async (message, tokens) => {
  try {
    const unregisteredTokens = await client.sendMulticast(message, tokens);
    return { success: true, unregisteredTokens };
  } catch (error) {
    return { success: false, error };
  }
};

module.exports = {
    sendMulticastMessageOvg,
};
