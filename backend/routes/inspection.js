const express = require('express');
const router = express.Router();

const db = require('../handlers/db.js');
const Inspection = require('../types/inspection.js');

router.get('/', (req, res) => {
    if (req.body) {
        db.fetchInspections((err, rows) => {
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

router.post('/', (req, res) => {
    if (req.body) {
        db.addInspection(new Inspection(1, 2), (err, rows) => {
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

router.get('/:id', (req, res) => {
    if (req.body) {
        db.fetchInspection(req.params.id, (err, rows) => {
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
        db.voteForInspection(req.params.id, -1, (err, rows) => {
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