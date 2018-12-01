const mariadb = require('mariadb');
const credentials = JSON.parse(require('fs').readFileSync('tokens/dbCredentials.json'));

const pool = mariadb.createPool({
    host: credentials.host,
    port: credentials.port,
    user: credentials.user,
    database: credentials.database,
    password: credentials.password
});

pool.getConnection().then(conn => {
    console.log("DB connected");
    conn.query("SHOW TABLES").then(rows => {
        console.log(rows);
        conn.close();
    });
});

module.exports = {
    fetchAccidents: function() {
        pool.getConnection().then(conn => {
            conn.query(
                'SELECT test FROM test2 WHERE id = ? AND time = ?',
                ['1, 2']
                ).then(rows => {
                //do something with the rows and return it
            }).catch(err => {
                conn.close();
                console.log(err.stack);
                return null;
            });
        }).catch(err => {
            conn.close();
            console.log(err.stack);
            return null
        });
    },
    //TODOs
    fetchAccident: function(accidentId) {
      pool.getConnection().then(conn => {
        conn.query(
          `SELECT * FROM accidents a
            JOIN stopline s ON a.stopline=s.id
            JOIN 
    },
    voteForAccident: function(accidentId, up) {}, //(int, bool)
    addAccident: function(accident) {}, //(object)

    fetchInspections: function() {},
    fetchInspection: function(inspectionId) {},
    voteForInspection: function(inspectionId, up) {},
    addInspection: function(inspection) {}
};
