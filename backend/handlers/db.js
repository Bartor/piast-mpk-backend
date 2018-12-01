const mariadb = require('mariadb/callback');
const credentials = JSON.parse(require('fs').readFileSync('tokens/dbCredentials.json'));

const conn = mariadb.createConnection({
    host: credentials.host,
    port: credentials.port,
    user: credentials.user,
    database: credentials.database,
    password: credentials.password
});

module.exports = {
    fetchAccidents: function(cb) {
        conn.query(
            'SELECT test FROM test2 WHERE id = ? AND time = ?',
            [1, 2],
            cb
        );
    },
    //TODOs
    fetchAccident: function(accidentId, cb) {
        pool.getConnection().then(conn => {
            conn.query(
                `SELECT * FROM accidents a
                    JOIN stopline s ON a.stopline=s.id
                    JOIN 
                `,
                cb
            );
    },
    voteForAccident: function(accidentId, up, cb) {}, //(int, bool)
    addAccident: function(accident, cb) {}, //(object)

    fetchInspections: function(cb) {},
    fetchInspection: function(inspectionId, cb) {},
    voteForInspection: function(inspectionId, up, cb) {},
    addInspection: function(inspection, cb) {}
};
