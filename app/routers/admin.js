const express = require('express');
const router = express.Router();
const categoryModel = require('../model/category.js');

router.get('/', async (req, res, next) => {
    try {
        res.render('profile', {
            contain: 'admin/index',
            title: 'Quản lí danh mục',
            js:['simpleFormatMoney','admin'],
            css:['admin-index']
        });
    } catch (err) {
        next(err);
    }
})


router.get('/category', async (req, res, next) => {
    try {
        // adminID = 1;
        var adminId = 1;
        var categories = await categoryModel.getAll()
        console.log(categories);
        // res.render('profile', {
        //     contain: 'student/profile',
        //     title: 'Hồ sơ',
        //     page: 'profile',
        //     studentProfile: studentProfile[0],
        //     result: req.query.result,
        //     js: 'profile'
        // });
    } catch (err) {
        next(err);
    }
})

module.exports = router;