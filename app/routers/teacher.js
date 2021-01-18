const express = require('express');
const router = express.Router();
const studentModel = require('../model/student.js');
const courseModel = require('../model/course.js');
const watchListModel = require('../model/watchList.js');
const chapterModel = require('../model/chapter.js');
const lessonModel = require('../model/lesson.js');
const ratingModel = require('../model/rating.js');
const categoryModel = require('../model/category.js');
const postCategoryModel = require('../model/postCategory.js');
const helper = require('../helper/pagination');
const url = require('url');

//multer
var multer = require('multer');
const course = require('../model/course.js');
var imageMimeTypes = ['image/jpeg', 'image/png'];
var storage = multer.diskStorage({
    destination: function (req, file, next) {
        next(null, 'public/uploads/img/courseImage')
    },
    filename: function (req, file, next) {
        next(null, file.fieldname + '-' + Date.now() + '.jpg')
    }
})

var upload = multer({
    storage: storage,
    fileFilter: (req, file, next) => {
        next(null, imageMimeTypes.includes(file.mimetype))
    }
})


router.get('/', async (req, res, next) => {
    try {
        var courses;
        const teacherID = 1;
        if ((req.query.page == null) || (req.query.page.trim() == '')) {
            req.query.page = 1;
        }
        if ((req.query.perPage == null) || (req.query.perPage.trim() == '')) {
            req.query.perPage = 3;
        }
        if ((req.query.search == null) || (req.query.search.trim() == '')) {
            courses = await courseModel.getCourseByTeacherID(teacherID);
        } else {
            courses = await courseModel.findLikeNameByTeacherID(req.query.search, teacherID);
        }
        // add width star
        for (var i = 0; i < courses.length; i++) {
            courses[i].widthStar = courses[i].averageStar / 5 * 100;
            courses[i].widthStar += '%';
        }
        var page = req.query.page;
        var perPage = req.query.perPage;
        var pagingInfo = helper.pagination(courses, page, perPage, courses.length);
        res.render('render', {
            contain: 'teacher/index',
            title: 'Quản lí khóa học',
            js: ['teacher'],
            css: ['admin-index', 'rate'],
            courses: pagingInfo.objectOnPage,
            pagingInfo: pagingInfo,
            currentPage: page,
            perPage: perPage
        });
    } catch (err) {
        next(err);
    }
})

router.get('/add-course', async (req, res, next) => {
    try {
        var postCategory = await postCategoryModel.getAll();
        res.render('render', {
            contain: 'teacher/add-course',
            title: 'Đăng khóa học',
            js: ['teacher-course', 'simpleFormatMoney', 'teacher'],
            css: ['admin-index'],
            postCategory: postCategory
        });
    } catch (err) {
        next(err);
    }
})

router.post('/get-category', async (req, res, next) => {
    try {
        var postCategoryID = req.body.postCategoryID;
        var categories = await categoryModel.getByPostCategoryID(postCategoryID);
        res.json({
            status: 0,
            categories: categories
        })
    } catch (err) {
        next(err);
    }
})

router.post('/post-course', async (req, res, next) => {
    try {
        var teacherID = 1;
        var price = req.body.coursePrice;
        var coursePrice = price.replace(',', '');
        var courseInfo = {
            courseName: req.body.courseName,
            courseSortDes: req.body.courseSortDes,
            courseDes: req.body.courseDes,
            coursePrice: coursePrice,
            postCategory: req.body.postCategory,
            category: req.body.category,
            htmlCourseDes: req.body.htmlCourseDes,
            htmlCourseSortDes: req.body.htmlCourseSortDes,
            courseImagePath: '/img/course/default.jpg'
        }
        if (courseInfo.coursePrice < 0) {
            res.json({
                status: 1,
            })
        }
        await courseModel.create(teacherID, courseInfo);
        console.log(courseInfo);
        res.json({
            status: 0,
        })

    } catch (err) {
        next(err);
    }
})

router.get('/update-course-info', async (req, res, next) => {
    try {
        var teacherID = 1;
        var courseID = req.query.courseID;
        var postCategory = await postCategoryModel.getAll();
        var courseInfo = await courseModel.getCourseByID(courseID);
        var categoryInfo = await categoryModel.getByID(courseInfo[0].categoryID);
        var postCategoryInfo = await postCategoryModel.getByID(categoryInfo[0].postCategoryID);
        res.render('render', {
            contain: 'teacher/update-course-info',
            title: 'Đăng khóa học',
            js: ['teacher-course', 'teacher', 'teacher-update-course-info', 'simpleFormatMoney'],
            css: ['admin-index'],
            postCategory: postCategory,
            course: courseInfo[0],
            categoryInfo: categoryInfo[0],
            postCategoryInfo: postCategoryInfo[0],
        })
    } catch (err) {
        next(err);
    }
})

router.get('/update-course-content', async (req, res, next) => {
    try {
        var courseID = req.query.courseID;
        var courseInfo = await courseModel.getCourseByID(courseID);
        // chapter info
        var chapterInfo = await chapterModel.getChaptersByCourseID(courseInfo[0].courseID);
        // lesson info
        for (var i = 0; i < chapterInfo.length; i++) {
            chapterInfo[i].lessons = await lessonModel.getLessonsByChapterID(chapterInfo[i].chapterID)
        }
        res.render('render', {
            contain: 'teacher/update-course-content',
            title: 'Đăng khóa học',
            js: ['teacher-course', 'teacher', 'teacher-update-course-content', 'simpleFormatMoney'],
            css: ['admin-index'],
            course: courseInfo[0],
            chapterInfo: chapterInfo,
            courseID: courseID
        })
    } catch (err) {
        next(err);
    }
})

router.post('/delete-lesson', async (req, res, next) => {
    try {
        var lessonID = req.body.lessonID;
        await lessonModel.delete(lessonID);
        res.json({
            status: 0,
            message: 'Xóa thành công'
        })
    } catch (err) {
        next(err);
    }
})

router.post('/delete-chapter', async (req, res, next) => {
    try {
        var chapterID = req.body.chapterID;
        await chapterModel.delete(chapterID);
        res.json({
            status: 0,
            message: 'Xóa thành công'
        })
    } catch (err) {
        next(err);
    }
})

module.exports = router;
