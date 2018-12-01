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
            let user = {
                token: token,
                exp: new Date().getTime() + 3600000,
                uid: 1
            }
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
          return reject(err);
        }
      });
    }
};