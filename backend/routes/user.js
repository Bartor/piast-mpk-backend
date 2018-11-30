const express = require('express');
const router = express.Router();

const auth = require('../handlers/auth.js');

router.get('/', (req, res) => {
    if (req.token === undefined) {
        res.status(400).send('expected \'Authorization\' header');
    } else {
        if (auth.verifyToken(req.token)) {
            res.status(200).send();
        } else {
            res.status(401).send('provided token seems to be invalid');
        }
    }
});

module.exports = router;