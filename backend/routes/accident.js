const express = require('express');
const router = express.Router();

const db = require('../handlers/db.js');

router.get('/', (req, res) => {
    db.fetchAccidents((err, rows) => {
        if (err) {
            console.log(err.stack);
            res.status(500).send();
        } else {
            console.log(rows);
        }
    });
});

router.post('/', (req, res) => {
    if (req.body) {
        
    } else {
        res.status(400).send('Content-Type should be application/json');   
    }
});

router.get('/:id', (req, res) => {

});

router.patch('/:id', (req, res) => {

});

module.exports = router;