const express = require('express');
const router = express.Router();

// const modelname = require('../models/modelname');

router.get('/', async (req, res) => {
    res.render('home', {
        css: ['signup'],
        js: ['singup'],
        contain: 'guest/signup/signup',
        title: 'Sign Up',
    });
});

module.exports = router;