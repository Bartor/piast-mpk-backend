const admin = require('firebase-admin');

const serviceAccount = JSON.parse(require('fs').readFileSync('tokens/firebaseServiceAccountKey.json'));

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://piastmpk.firebaseio.com'
});

module.exports = {
    cachedUsers: {},
    verifyToken: function(token) {
        if (this.cachedUsers.hasOwnProperty(token) && this.cachedUsers[token].exp > new Date().getTime()) {
            return true;
        }
        admin.auth().verifyIdToken(token).then(decodedToken => {
            let uid = decodedToken.uid;
            this.cachedUsers[uid] = {};
            admin.auth().getUser(uid).then(userRecord => {
                userRecord.exp = decodedToken.exp;
                userRecord.token = token;
                Object.assign(userRecord, this.cachedUsers[uid]);
                setTimeout((uid) => {
                    delete this.cachedUsers[uid];
                }, 3600000);
                return true;
            }).catch(err => {
                console.log(err.stack);
                return false;
            });
        }).catch(err => {
            console.log(err.stack);
            return false;
        });
    }
};