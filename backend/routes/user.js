const express = require('express');
const router = express.Router();

const auth = require('../handlers/auth.js');

router.get('/', (req, res) => {
    res.send('Token: ' + req.token);
});

module.exports = router;