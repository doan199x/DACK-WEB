const express = require('express');
const router = express.Router();

// const modelname = require('../models/modelname');

router.get('/', async (req, res) => {
    res.render('home', {
        css: [''],
        js: [''],
        contain: 'guest/login',
        title: 'Login',
    });
});

module.exports = router;