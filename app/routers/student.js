const express = require('express');
const router = express.Router();
const studentModel = require('../model/student.js');
const courseModel = require('../model/course.js');
const url = require('url');

//multer
var multer = require('multer');
var imageMimeTypes = ['image/jpeg', 'image/png'];
var storage = multer.diskStorage({
    destination: function (req, file, next) {
        next(null, 'public/uploads/img/avatar')
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

router.get('/profile', async (req, res, next) => {
    try {
        // studentID = 1;
        const studentID = 1;
        var studentProfile = await studentModel.getProfile(studentID);
        res.render('profile', {
            contain: 'student/profile',
            title: 'Hồ sơ',
            page: 'profile',
            studentProfile: studentProfile[0],
            result: req.query.result
        });
    } catch (err) {
        next(err);
    }
})

router.get('/profile/edit', async (req, res, next) => {
    try {
        // studentID = 1;
        const studentID = 1;
        var studentProfile = await studentModel.getProfile(studentID);
        res.render('profile', {
            contain: 'student/profile-edit',
            title: 'Chỉnh sửa hồ sơ',
            page: 'profile',
            studentProfile: studentProfile[0]
        });
    } catch (err) {
        next(err);
    }
})

router.post('/profile/edit', upload.single('fileAvatar'), async (req, res, next) => {
    try {
        // studentID = 1;
        const studentID = 1;
        var student = await studentModel.getAvatarPath(studentID);
        var avatarPath;
        if (req.file) {
            avatarPath = '/uploads/img/avatar/' + req.file.filename;
            if (student[0].avatarPath != '/img/avatar/default.jpg') {
                const fs = require('fs');
                let oldAvatarPath = './public/uploads/img/avatar/' + student[0].avatarPath.slice(19);
                fs.unlink(oldAvatarPath, function (err) {
                    if (err) {
                        res.redirect(url.format({
                            pathname: '/student/profile',
                            query: {
                                result: "fail"
                            }
                        }));
                    }
                });
            }
        } else {
            avatarPath = student[0].avatarPath;
        }
        var profile = {
            name: req.body.profileName,
            email: req.body.profileEmail,
            phone: req.body.profilePhone,
            dateOfBirth: req.body.profileDateOfBirth,
            avatarPath: avatarPath
        }
        await studentModel.updateProfile(studentID, profile);
        res.redirect(url.format({
            pathname: '/student/profile',
            query: {
                result: "success"
            }
        }));
    } catch (err) {
        res.redirect(url.format({
            pathname: '/student/profile',
            query: {
                result: "fail"
            }
        }));
    }
})

router.get('/watch-list', async (req, res, next) => {
    try {
        const studentID = 1;
        const itemsPerRow = 3;
        var watchList = await courseModel.getWatchListbyStudentID(studentID);
        var groupedWatchList = [];
        var groupedCourse = [];
        for (let i = 0; i < watchList.length; i++) {
            if (i % itemsPerRow == 0) {
                groupedCourse = []
            }
            groupedCourse.push(watchList[i]);
            if (i % itemsPerRow == 2) {
                groupedWatchList.push(groupedCourse);
            }
            if (i == watchList.length) {
                groupedWatchList.push(groupedCourse)
            }
        }
        res.render('watch-list', {
            contain: 'student/watch-list',
            title: 'Home',
            page: 'watch-list',
            groupedWatchList: groupedWatchList
        });
    } catch (err) {
        next(err);
    }
})

router.get('/course-list', async (req, res, next) => {
    try {
        const studentID = 1;
        var registeredCourseID = await courseModel.getRegisteredCourseByStudentID(studentID);
        const itemsPerRow = 3;
        var groupedRegisteredCourse = [];
        var groupedCourse = [];
        for (let i = 0; i < registeredCourseID.length; i++) {
            if (i % itemsPerRow == 0) {
                groupedCourse = []
            }
            groupedCourse.push(registeredCourseID[i]);
            if (i % itemsPerRow == 2) {
                groupedRegisteredCourse.push(groupedCourse);
            }
            if (i == registeredCourseID.length) {
                groupedRegisteredCourse.push(groupedCourse)
            }
        }
        res.render('course-list', {
            contain: 'student/course-list',
            title: 'Home',
            page: 'course-list',
            groupedRegisteredCourse: groupedRegisteredCourse
        });
    } catch (err) {
        next(err);
    }
})

module.exports = router;