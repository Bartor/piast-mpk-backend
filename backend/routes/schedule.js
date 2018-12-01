const express = require('express');
const router = express.Router();

const db = require('../handlers/db.js');
const auth = require('../handlers/auth.js');

router.get('/stop', (req, res) => {
    if (req.token === undefined) {
        res.status(400).send('expected \'Authorization\' header');
    } else {
        auth.verifyToken(req.token).then(output => {
            db.fetchStop((err, rows) => {
                if (err) {
                    console.log(err);
                    res.status(500).send();
                } else {
                    res.json(rows);
                }
            });

        }).catch(err => {
            console.log(err);
            res.status(401).send();
        });
    }
});

router.get('/line', (req, res) => {
    if (req.token === undefined) {
        res.status(400).send('expected \'Authorization\' header');
    } else {
        auth.verifyToken(req.token).then(output => {
            db.fetchLine((err, rows) => {
                if (err) {
                    console.log(err);
                    res.status(500).send();
                } else {
                    res.json(rows);
                }
            });

        }).catch(err => {
            console.log(err);
            res.status(401).send();
        });
    }
});

router.get('/stopline', (req, res) => {
    if (req.token === undefined) {
        res.status(400).send('expected \'Authorization\' header');
    } else {
        auth.verifyToken(req.token).then(output => {
            db.fetchLineStop((err, rows) => {
                if (err) {
                    console.log(err);
                    res.status(500).send();
                } else {
                    res.json(rows);
                }
            });

        }).catch(err => {
            console.log(err);
            res.status(401).send();
        });
    }
});

module.exports = router;