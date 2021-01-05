const express = require('express');
const router = express.Router();

const guestModel = require('../model/guest.js')
// const modelname = require('../models/modelname');

router.get('/', async (req, res) => {
    try {
        const top = await guestModel.top();
        const topview = await guestModel.topview();
        const newest = await guestModel.newest();
        const mostwatched = await guestModel.mostwatched();
        res.send(topview);
        // res.render('home', {
        //     css: [''],
        //     js: [''],
        //     contain: 'guest/guest',
        //     title: 'Home',
        //     top: top,
        //     topview: topview,
        //     newest: newest,
        //     mostwatched: mostwatched
        // });
    } catch (err) {
        console.log(err);
    }
});

module.exports = router;