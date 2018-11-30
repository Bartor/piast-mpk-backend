const express = require('express');
const router = express.Router();

const db = require('../handlers/db.js');

router.get('/', (req, res) => {
    res.send('Dzięki za wizytę!');
});

module.exports = router;