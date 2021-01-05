const express = require('express');
const router = express.Router();
const studentModel = require('../model/student.js');

router.get('/profile',async (req, res, next) => {
    try {
        // studentID = 1;
        var studentID = 1;
        studentProfile = await studentModel.getProfile(studentID);
        res.render('profile', {
            contain: 'student/profile',
            title: 'Home',
            page: 'profile',
            studentProfile: studentProfile[0]
        });
    } catch (err) {
        next(err);
    }
})

router.get('/watch-list', (req, res) => {
    res.render('watch-list', {
        contain: 'student/watch-list',
        title: 'Home',
        page: 'watch-list'
    });
})

router.get('/course-list', (req, res) => {
    res.render('course-list', {
        contain: 'student/course-list',
        title: 'Home',
        page: 'course-list'
    });
})

module.exports = router;