const express = require('express');
const router = express.Router();

const db = require('../handlers/db.js');
const auth = require('../handlers/auth.js');

router.get('/stop', (req, res) => {
    if (req.token === undefined) {
        res.status(400).send('expected \'Authorization\' header');
    } else {
        auth.verifyToken(req.token).then(output => {
            res.json([
                {id: 1, name: "JP2", long: 21.37, lat: 66.666},
                {id: 2, name: "XD", long: 122, lat: 0.01},
            ]);
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
            res.json([
                {id: 32, name: "10", type: "t"},
                {id: 123, name: "OL", type: "a"}
            ]);
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
            res.json([
                {id: 1, stop: 1, line: 123, ord: 0, direction: 1},
                {id: 2, stop: 2, line: 123, ord: 1, direction: 1},
                {id: 3, stop: 2, line: 32, ord: 3, direction: 0},
                {id: 4, stop: 1, line: 123, ord: 4, direction: 0},
            ])
        }).catch(err => {
            console.log(err);
            res.status(401).send();
        });
    }
});

module.exports = router;