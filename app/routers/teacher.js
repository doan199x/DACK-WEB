const express = require('express');
const router = express.Router();
const studentModel = require('../model/student.js');
const courseModel = require('../model/course.js');
const watchListModel = require('../model/watchList.js');
const chapterModel = require('../model/chapter.js');
const lessonModel = require('../model/lesson.js');
const ratingModel = require('../model/rating.js');
const helper = require('../helper/pagination');
const url = require('url');

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
            courses = await courseModel.findLikeNameByTeacherID(req.query.search,teacherID);
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

module.exports = router;
