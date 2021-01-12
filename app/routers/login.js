const express = require('express');
const router = express.Router();

// const modelname = require('../models/modelname');

router.get('/', async (req, res) => {
    res.render('home', {
        css: ['login'],
        js: ['login'],
        contain: 'guest/login/login',
        title: 'Login',
    });
});

module.exports = router;