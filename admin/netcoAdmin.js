const admin = require('firebase-admin');
const netcoAdmin = admin.initializeApp({
    credential: admin.credential.cert(require('../config/serviceAccount-netco.json')),
    databaseURL: 'https://netco-ex-default-rtdb.asia-southeast1.firebasedatabase.app'
  }, 'netcoAdmin');

  module.exports = netcoAdmin