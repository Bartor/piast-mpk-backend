const express = require('express');
const router = express.Router();

const auth = require('../handlers/auth.js');

router.get('/', (req, res) => {
    if (req.token === undefined) {
        res.status(400).send('expected \'Authorization\' header');
    } else {
        auth.verifyToken(req.token).then(output => {
            res.status(200).send();
        }).catch(err => {
            console.log(err.message);
            res.status(401).send();
        });
    }
});

module.exports = router;