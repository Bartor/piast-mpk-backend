const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
    res.send('Token: ' + req.token);    
});

module.exports = router;