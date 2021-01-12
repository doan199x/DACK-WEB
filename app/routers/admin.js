const express = require('express');
const router = express.Router();
const categoryModel = require('../model/category.js');
const postCategoryModel = require('../model/postCategory.js');
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
        var postCategories = await postCategoryModel.getAll();
        for (var i = 0; i < postCategories.length; i++) {
            var categories = await categoryModel.getByPostCategoryID(postCategories[i].postCategoryID);
            postCategories[i].categories = categories;
        }
        res.render('render', {
            contain: 'admin/admin-category',
            title: 'Quản lí danh mục',
            js: ['admin','category'],
            css: ['admin-index'],
            postCategories: postCategories
        });
    } catch (err) {
        next(err);
    }
})

router.post('/category-create', async (req, res, next) => {
    try {
        var categoryName = req.body.categoryName;
        var postCategoryID = req.body.postCategoryID
        await categoryModel.create(categoryName, postCategoryID);
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

router.post('/post-category-update', async (req, res, next) => {
    try {
        var postCategoryID = req.body.postCategoryID;
        var postCategoryName = req.body.postCategoryName;
        await postCategoryModel.update(postCategoryID, postCategoryName);
        res.json({
            result: 'oke'
        })
    } catch (err) {
        next(err);
    }
})

router.post('/category-update', async (req, res, next) => {
    try {
        var categoryID = req.body.categoryID;
        var categoryName = req.body.categoryName;
        await categoryModel.update(categoryID, categoryName);
        res.json({
            result: 'oke'
        })
    } catch (err) {
        next(err);
    }
})

router.post('/post-category-delete', async (req, res, next) => {
    try {
        var postCategoryID = req.body.postCategoryID;
        // find category by post-category
        // check if category has course
        var categories = await categoryModel.getByPostCategoryID(postCategoryID);
        var check = false;
        for (var i = 0; i < categories.length; i++) {
            var courses = await courseModel.getCourseByCategoryID(categories[0].categoryID);
            if (courses.length > 0) {
                check = true;
            }
        }
        if (check == true) {
            res.json({
                check: check
            })
        } else {
            for (var i = 0; i < categories.length; i++) {
                await categoryModel.delete(categories[i].categoryID);
            }
            await postCategoryModel.delete(postCategoryID);
            res.json({
                check: check
            })
        }
    } catch (err) {
        next(err);
    }
})

router.post('/post-category-create', async (req, res, next) => {
    try {
        var postCategoryName = req.body.postCategoryName;
        await postCategoryModel.create(postCategoryName);
        res.json({
            result: 'oke'
        })
    } catch (err) {
        next(err);
    }
})

module.exports = router;