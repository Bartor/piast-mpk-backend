const admin = require('firebase-admin');

const serviceAccount = require('tokens/firebaseServiceAccountKey.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://piastmpk.firebaseio.com'
});

module.exports = {
    cachedUsers: {},
    verifyToken: function(token) {
        admin.auth().verifyIdToken(token).then(decodedToken => {
            return decodedToken;
        }).catch(err => {
            console.log(err.stack);
            return null;
        });
    }
};