const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
    console.log('Token: ' + req.token);
    res.send('xD');
});

module.exports = router;