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
            `SELECT * FROM accidents 
                WHERE TIMESTAMPDIFF(MINUTE, NOW(), time) < 30`,
            cb
        );
    },
    //TODOs
    fetchAccident: function(accidentId, cb) {
        conn.query(
            `SELECT * FROM accidents a
                JOIN stopline sl ON a.stopline=sl.id
                JOIN line l ON sl.line_id=l.id
                JOIN stop s ON sl.stop_id=s.id
                WHERE id=?
            `,
            [accidentId],
            cb
        );
    },
    voteForAccident: function(accidentId, up, cb) {
        conn.query(
            `UPDATE accidents SET rate = rate + (?) 
                WHERE id=?`,
            [up, accidentId],
            cb
        )
          
    }, //(int, bool)
    addAccident: function(accident, cb) {
        conn.query(
            `INSERT INTO accidents (stopline, time, user, description)
                VALUES (?, ?, ?, ?)`,
            [accident.stopline, accident.time, accident.user, accident.desctiption],
            cb
        )
    }, //(object)

    fetchInspections: function(cb) {
        conn.query(
            `SELECT * FROM inspections 
                WHERE TIMESTAMPDIFF(MINUTE, NOW(), time) < 30`,
            cb
        )
    },
    fetchInspection: function(inspectionId, cb) {
        conn.query(
            `SELECT * FROM inspections a
                JOIN stopline sl ON a.stopline=sl.id
                JOIN line l ON sl.line_id=l.id
                JOIN stop s ON sl.stop_id=s.id
                WHERE id=?
            `,
            [inspectionId],
            cb
        );
    },
    voteForInspection: function(inspectionId, up, cb) {
        conn.query(
            `UPDATE accidents SET rate = rate + (?) 
                WHERE id=?`,
            [up, accidentId],
            cb
        )
    },
    addInspection: function(inspection, cb) {
        conn.query(
            `INSERT INTO inspections (stopline, time, user)
                VALUES (?, ?, ?)`,
            [accident.stopline, accident.time, accident.user],
            cb
        )
    }
};
