const express = require('express');
const router = express.Router();


router.route('/')
    .get()
    .post()
    .put()
    .delete();
    router.route('/:id')
    .get();

module.exports = router;