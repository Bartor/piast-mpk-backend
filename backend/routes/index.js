const express = require('express');
const router = express.Router();

const db = require('../handlers/db.js');

router.get('/', (req, res) => {
    res.json({
        id: 666,
        
    });
});

module.exports = router;