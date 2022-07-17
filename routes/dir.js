const express = require ('express');
const router = express.Router();
const path = require('path');

router.get('/', (req, res) => {
    res.sendFile('index.html', {root: path.join(__dirname, '../views')});
})

router.get('/test', (req, res) => {
    res.sendFile(path.join(__dirname,'views','test.html'));
})


module.exports = router;