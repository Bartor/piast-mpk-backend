const mariadb = require('mariadb');
const credentials = JSON.parse(require('fs').readFileSync('tokens/dbCredentials.json'));


const pool = mariadb.createPool({
    host: credentials.host,
    port: credentials.port,
    user: credentials.user,
    password: credentials.password
});

pool.getConnection().then(conn => {
    console.log("DB connected");
});

module.exports = {
    fetchAccidents: function() {
        return [];
    }
};