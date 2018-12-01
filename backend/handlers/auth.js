const admin = require('firebase-admin');

const serviceAccount = JSON.parse(require('fs').readFileSync('tokens/firebaseServiceAccountKey.json'));

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://piastmpk.firebaseio.com'
});

module.exports = {
    cachedUsers: [],
    verifyToken: function(token) {
      let that = this;
      return new Promise(async function(resolve, reject) {
        for (let u of that.cachedUsers) {
          if (u.token === token) {
            return resolve(u);
          }
        }
        try {
          let decodedToken = await admin.auth().verifyIdToken(token);
          let user = await admin.auth().getUser(decodedToken.uid);
          user.exp = decodedToken.exp;
          user.token = token;
          that.cachedUsers.push(user);
          setTimeout((token) => {
            for(let i = 0; i < that.cachedUsers.length; i++) {
              if (that.cachedUsers[i].token === token) {
                that.cachedUsers.splice(i, 0);
                break;
              }
            }
          }, 3600000);
          return resolve(user);
        } catch(err) {
          console.log(err);
          return reject(null);
        }
      });
    }
};