const fcmV1Http2 = require('fcm-v1-http2');
const path = require('path');
const fs = require('fs');

const serviceAccountPath = path.join(__dirname, '../config/serviceAccount-netco.json');
const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'));

const client = new fcmV1Http2({
  serviceAccount: serviceAccount,
  maxConcurrentConnections: 10, 
  maxConcurrentStreamsAllowed: 100, 
});

const sendMulticastMessageNetco = async (message, tokens) => {
  try {
    const unregisteredTokens = await client.sendMulticast(message, tokens);
    return { success: true, unregisteredTokens };

  } catch (error) {
    return { success: false, error };
  }
};

module.exports = {
  sendMulticastMessageNetco,
};
