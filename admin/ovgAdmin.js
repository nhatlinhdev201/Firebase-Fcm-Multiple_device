const admin = require('firebase-admin');
const ovgAdmin = admin.initializeApp({
    credential: admin.credential.cert(require('../config/serviceAccount-ovg.json')),
    databaseURL: 'https://golden-bee-651eb-default-rtdb.asia-southeast1.firebasedatabase.app'
}, 'ovgAdmin');

module.exports = ovgAdmin