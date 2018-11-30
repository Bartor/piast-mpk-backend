const express = require('express');
const router = express.Router();

const db = require('../handlers/db.js');

router.get('/', (req, res) => {
    res.json({
        success: true,
        stopline: {
            id: 2,
            line_name: 'jp2',
            stop_name: 'xDDDDDd',
            ord: 4,
            direction: false,
        },
        id: 666,
        rating: -2,
        time: new Date().getTime(),
        desc: 'tramwaj się zepsuł lol'
    });
});

module.exports = router;