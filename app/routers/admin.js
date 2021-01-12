const express = require('express');
const router = express.Router();
const categoryModel = require('../model/category.js');
const courseModel = require('../model/course.js');

router.get('/', async (req, res, next) => {
    try {
        res.render('render', {
            contain: 'admin/index',
            title: 'Nạp tiền',
            js: ['simpleFormatMoney', 'admin'],
            css: ['admin-index']
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
        res.render('render', {
            contain: 'admin/admin-category',
            title: 'Quản lí danh mục',
            js: ['admin'],
            css: ['admin-index'],
            categories: categories
        });
    } catch (err) {
        next(err);
    }
})

router.post('/category-create', async (req, res, next) => {
    try {
        var categoryName = req.body.categoryName;
        await categoryModel.create(categoryName);
        res.json({
            result: 'oke'
        })
    } catch (err) {
        next(err);
    }
})
router.post('/category-delete', async (req, res, next) => {
    try {
        var categoryID = req.body.categoryID;
        // check do category has courses
        var check = false;
        var courses = await courseModel.getCourseByCategoryID(categoryID);
        if (courses.length > 0) {
            check = true;
            res.json({
                check: check
            })
        } else {
            await categoryModel.delete(categoryID);
            res.json({
                check: check
            })
        }
    } catch (err) {
        next(err);
    }
})
module.exports = router;