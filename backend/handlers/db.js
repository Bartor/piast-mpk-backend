const mariadb = require('mariadb/callback');
const credentials = JSON.parse(require('fs').readFileSync('tokens/dbCredentials.json'));

const conn = mariadb.createConnection({
    host: credentials.host,
    port: credentials.port,
    user: credentials.user,
    database: credentials.database,
    password: credentials.password
});

conn.query('SHOW TABLES;', (err, rows) => {
    if(err) console.log(err);
    console.log(rows);
});

module.exports = {
    fetchAccidents: function(cb) {
        conn.query(
            `SELECT * FROM piastmpk.accidents 
                WHERE TIMESTAMPDIFF(MINUTE, NOW(), time) < 30`,
            cb
        );
    },
    //TODOs
    fetchAccident: function(accidentId, cb) {
        conn.query(
            `SELECT * FROM piastmpk.accidents a
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
            `UPDATE piastmpk.accidents SET rate = rate + (?) 
                WHERE id=?`,
            [up, accidentId],
            cb
        )
          
    }, //(int, bool)
    addAccident: function(accident, cb) {
        conn.query(
            `INSERT INTO piastmpk.accidents (stopline, time, user_id, description)
                VALUES (?, FROM_UNIXTIME(?), ?, ?)`,
            [accident.stopline, accident.time, accident.user, accident.description],
            cb
        )
    }, //(object)

    fetchInspections: function(cb) {
        conn.query(
            `SELECT * FROM piastmpk.inspection
                WHERE TIMESTAMPDIFF(MINUTE, NOW(), time) < 30`,
            cb
        )
    },
    fetchInspection: function(inspectionId, cb) {
        conn.query(
            `SELECT * FROM piastmpk.inspection a
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
            `UPDATE piastmpk.accidents SET rate = rate + (?) 
                WHERE id=?`,
            [up, inspectionId],
            cb
        )
    },
    addInspection: function(inspection, cb) {
        conn.query(
            `INSERT INTO piastmpk.inspection (stopline, time, user_id)
                VALUES (?, FROM_UNIXTIME(?), ?)`,
            [inspection.stopline, inspection.time, inspection.user],
            cb
        )
    },
    
    fetchLine: function(cb) {
        conn.query(
            `SELECT * FROM piastmpk.lines`,
            cb
        );
    },
    fetchStop: function(cb) {
        conn.query(
            `SELECT * FROM piastmpk.stops`,
            cb
        );
    },
    fetchLineStop: function(cb) {
        conn.query(
            `SELECT * FROM piastmpk.stopline`,
            cb
        );
    }
};
