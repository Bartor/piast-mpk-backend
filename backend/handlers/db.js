const mariadb = require('mariadb');
const credentials = JSON.parse(require('fs').readFileSync('tokens/dbCredentials.json'));


const pool = mariadb.createPool({
    host: credentials.host,
    port: credentials.port,
    user: credentials.user,
    //database: credentials.database,
    password: credentials.password
});

pool.getConnection().then(conn => {
    console.log("DB connected");
    conn.query("SHOW DATABASES").then(rows => {
        console.log(rows);
        conn.close();
    });
});

module.exports = {
    fetchAccidents: function() {
        return [];
    }
};