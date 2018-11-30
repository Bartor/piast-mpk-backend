const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
    res.send('Dzięki za wizytę!');
});

module.exports = router;