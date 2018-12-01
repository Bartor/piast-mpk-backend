const express = require('express');
const router = express.Router();

const db = require('../handlers/db.js');
const Accident = require('../types/accident.js');

const auth = require('../handlers/auth.js');

router.get('/', (req, res) => {
    db.fetchAccidents((err, rows) => {
        if (err) {
            console.log(err.stack);
            res.status(500).send();
        } else {
            res.json(rows);
        }
    });
});

router.post('/', (req, res) => {
    if (req.body) {
        if (!req.body.stopline && req.body.description) {
            res.status(400).send('stopline and description in body required');
            return;
        }
        auth.verifyToken(req.token).then(output => {
            db.addAccident(new Accident(req.body.stopline, u.uid, req.description), (err, rows) => {
                if (err) {
                    console.log(err.stack);
                    res.status(500).send();
                } else {
                    res.json(rows);
                }
            });
        }).catch(err => {
            console.log(err);
            res.status(401).send();
        });
    } else {
        res.status(400).send('Content-Type should be application/json');   
    }
});

router.get('/:id', (req, res) => {
    if (req.body) {
        db.fetchAccident(req.params.id, (err, rows) => {
            if (err) {
                console.log(err.stack);
                res.status(500).send();
            } else {
                res.json(rows);
            }
        });
    } else {
        res.status(400).send('Content-Type should be application/json');   
    }
});

router.patch('/:id', (req, res) => {
    if (req.body) {
        db.voteForAccident(req.params.id, -1, (err, rows) => {
            if (err) {
                console.log(err.stack);
                res.status(500).send();
            } else {
                res.json(rows);
            }
        });
    } else {
        res.status(400).send('Content-Type should be application/json');   
    }
});

module.exports = router;