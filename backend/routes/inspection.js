const express = require('express');
const router = express.Router();

const db = require('../handlers/db.js');
const Inspection = require('../types/inspection.js');

const auth = require('../handlers/mauth.js');

router.get('/', (req, res) => {
    auth.verifyToken(req.token).then(output => {
        db.fetchInspections((err, rows) => {
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
});

router.post('/', (req, res) => {
    if (req.body) {
        if (!req.body.hasOwnProperty('stop_line_id') || !req.body.hasOwnProperty('direction')) {
            res.status(400).send('stopline, description and direction in body required');
            return;
        }
        auth.verifyToken(req.token).then(output => {
            db.addInspection(new Inspection(req.body.stop_line_id, req.body.direction, output.uid), (err, rows) => {
                if (err) {
                    console.log(err.stack);
                    res.status(500).send();
                } else {
                    res.json(rows);
                }
            });
        }).catch(err => {
            console.log(err.message);
            res.status(401).send();
        });
    } else {
        res.status(400).send('Content-Type should be application/json');   
    }
});

router.get('/:id', (req, res) => {
    if (req.body) {
        if(!req.params.id) {
            res.status(400).send('/id is required');
            return;
        }
        auth.verifyToken(req.token).then(output => {
            db.fetchInspection(req.params.id, (err, rows) => {
                if (err) {
                    console.log(err.stack);
                    res.status(500).send();
                } else {
                    res.json(rows);
                }
            });
        }).catch(err => {
            console.log(err.message);
            res.status(401).send();
        });
    } else {
        res.status(400).send('Content-Type should be application/json');   
    }
});

router.patch('/:id', (req, res) => {
    if (req.body) {
        if(!req.params.id) {
            res.status(400).send('/id is required');
            return;
        } else if (!req.body.hasOwnProperty('rating') || Math.abs(req.body.rating) != 1) {
            res.status(400).send('rating in body in value of -1 or 1 is required');
            return;
        }
        auth.verifyToken(req.token).then(output => {
            db.voteForInspection(req.params.id, req.body.rating, (err, rows) => {
                if (err) {
                    console.log(err.stack);
                    res.status(500).send();
                } else {
                    res.json(rows);
                }
            });
        }).catch(err => {
            console.log(err.message);
            res.status(401).send();
        });
    } else {
        res.status(400).send('Content-Type should be application/json');   
    }
});

module.exports = router;