const express = require('express');
const router = express.Router();
const studentModel = require('../model/student.js');
const courseModel = require('../model/course.js');
const watchListModel = require('../model/watchList.js');
const chapterModel = require('../model/chapter.js');
const lessonModel = require('../model/lesson.js');
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
            result: req.query.result,
            js: 'profile'
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
            studentProfile: studentProfile[0],
            js: 'profile'
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
        var watchList = await courseModel.getWatchListbyStudentID(studentID);
        res.render('watch-list', {
            contain: 'student/watch-list',
            title: 'Home',
            page: 'watch-list',
            courses: watchList,
            js: ['profile', 'watch-list']
        });
    } catch (err) {
        next(err);
    }
})

router.get('/course-list', async (req, res) => {
    try {
        const studentID = 1;
        var registeredCourseID = await courseModel.getRegisteredCourseByStudentID(studentID);
        res.render('course-list', {
            contain: 'student/course-list',
            title: 'Home',
            page: 'course-list',
            courses: registeredCourseID,
            js: 'profile'
        });
    } catch (err) {
        next(err);
    }
})

router.post('/remove-watch-list', async (req, res, next) => {
    try {
        const studentID = 1;
        await watchListModel.removeWatchList(studentID, req.body.courseID);
        res.json({
            result: 'success',
            courseID: req.body.courseID
        })
    } catch (err) {
        next(err)
    }
})

router.get('/watch', async (req, res, next) => {
    try {
        const studentID = 1;
        var courseID = req.query.courseID;
        var lessonID = req.query.lessonID;
        // check is course registred by studentid
        var registeredCourses = await courseModel.getRegisteredCourseByStudentID(studentID);
        var check = false;
        for (var i = 0; i < registeredCourses.length; i++) {
            if (registeredCourses[i].courseID == courseID) {
                check = true;
                break;
            }
        }
        // end checking
        if (check == false) {
            console.log("khoa hoc chua dc dang ki")
        } else {
            // Get contexn of course
            //get course name:
            var courseContent = await courseModel.getCourseByID(courseID);
            var courseName = courseContent[0].name;
            // get chapter:
            var chaptersContent = await chapterModel.getChaptersByCourseID(courseID);
            // get lesson:
            for (var i = 0; i < chaptersContent.length; i++) {
                var lessonsContent = await lessonModel.getLessonsByChapterID(chaptersContent[i].chapterID);
                chaptersContent[i].lessonContent = lessonsContent;
            }
            //get lessonIDMin
            var lessonIDMin = chaptersContent[0].lessonContent[0].lessonID;
            //get lessonIDMax
            var lessonIDMax = chaptersContent[chaptersContent.length-1].lessonContent[chaptersContent[chaptersContent.length-1].lessonContent.length-1].lessonID;
            var videoPath = await lessonModel.getLessonVideoPathByID(lessonID);
            res.render('course-list', {
                contain: 'student/watch',
                title: 'Home',
                js: ['watch-video', 'watch'],
                css: ['watch'],
                courseName: courseName,
                chapters: chaptersContent,
                lessonID: lessonID,
                courseID: courseID,
                videoPath: videoPath[0].videoPath,
                lessonIDMin : lessonIDMin,
                lessonIDMax: lessonIDMax
            });
        }
    } catch (err) {
        next(err);
    }
})

router.post('/get-video', async (req, res, next) => {
    try {
        var lessonID = req.body.lessonID;
        //get video path
        var videoPath = await lessonModel.getLessonVideoPathByID(lessonID);
        res.json({
            videoPath: videoPath[0].videoPath,
            lessonID: lessonID
        })

    } catch (err) {
        next(err);
    }
})

module.exports = router;