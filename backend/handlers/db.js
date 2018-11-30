const mariadb = require('mariadb');
const credentials = JSON.parse(require('fs').readFileSync('../tokens/dbCredentials.json'));


const pool = mariadb.createPool({
    host: credentials.host,
    user: credentials.user,
    password: credentials.password,
    connectionLimit: credentials.connectionLimit
});

pool.getConnection().then(conn => {
    print("DB connected");
});

module.exports = {
    fetchAccidents: function() {
        return [];
    }
};