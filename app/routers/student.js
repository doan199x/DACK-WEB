const express = require('express');
const router = express.Router();
const studentModel = require('../model/student.js');
const courseModel = require('../model/course.js');
const watchListModel = require('../model/watchList.js');
const chapterModel = require('../model/chapter.js');
const lessonModel = require('../model/lesson.js');
const ratingModel = require('../model/rating.js');
const registeredCourseModel = require('../model/registeredCourse.js');
const url = require('url');
const bcrypt = require('bcrypt')
const auth = require('../middleware/auth.mdw');

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

router.get('/profile', auth.adminStudentAuth, async (req, res, next) => {
    try {
        if ((req.query.studentID == null) || (req.query.studentID.trim() == '')) {
            req.query.studentID = 1;
        }
        var studentID
        if (req.session.user.role == 'admin') {
            studentID = req.query.studentID;
        } else {
            var studentID = req.session.user.studentID;
        }
        var studentProfile = await studentModel.getProfile(studentID);
        res.render('render', {
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

router.get('/profile-edit', auth.adminStudentAuth, async (req, res, next) => {
    try {
        if ((req.query.studentID == null) || (req.query.studentID.trim() == '')) {
            req.query.studentID = 1;
        }
        var studentID
        if (req.session.user.role == 'admin') {
            studentID = req.query.studentID;
        } else {
            var studentID = req.session.user.studentID;
        }
        var studentProfile = await studentModel.getProfile(studentID);
        res.render('render', {
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

router.post('/profile-edit', auth.adminStudentAuth, upload.single('fileAvatar'), async (req, res, next) => {
    try {
        if ((req.query.studentID == null) || (req.query.studentID.trim() == '')) {
            req.query.studentID = 1;
        }
        var studentID
        if (req.session.user.role == 'admin') {
            studentID = req.query.studentID;
        } else {
            var studentID = req.session.user.studentID;
        }
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

router.get('/watch-list', auth.studentAuth, async (req, res, next) => {
    try {
        var studentID = req.session.user.studentID;
        var watchList = await courseModel.getWatchListbyStudentID(studentID);
        res.render('render', {
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

router.get('/course-list', auth.studentAuth, async (req, res, next) => {
    try {
        var studentID = req.session.user.studentID;
        var registeredCourses = await courseModel.getRegisteredCourseByStudentID(studentID);
        for (var i = 0; i < registeredCourses.length; i++) {
            // get lessons of course
            var lessons = await lessonModel.getLessonsByCourseID(registeredCourses[i].courseID);
            var percentComplete = (registeredCourses[i].curLesson - lessons[0].lessonID) / (lessons[lessons.length - 1].lessonID - lessons[0].lessonID) * 100;
            percentComplete = percentComplete.toFixed(2) + '%';
            registeredCourses[i].percentComplete = percentComplete;
        }
        res.render('render', {
            contain: 'student/course-list',
            title: 'Home',
            page: 'course-list',
            courses: registeredCourses,
            js: 'profile'
        });
    } catch (err) {
        next(err);
    }
})

router.post('/remove-watch-list', auth.studentAuth, async (req, res, next) => {
    try {
        var studentID = req.session.user.studentID;
        await watchListModel.removeWatchList(studentID, req.body.courseID);
        res.json({
            result: 'success',
            courseID: req.body.courseID
        })
    } catch (err) {
        next(err)
    }
})

router.get('/watch', auth.studentAuth, async (req, res, next) => {
    try {
        var studentID = req.session.user.studentID;
        var courseID = req.query.courseID;

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
        var lessonIDMax = chaptersContent[chaptersContent.length - 1].lessonContent[chaptersContent[chaptersContent.length - 1].lessonContent.length - 1].lessonID;

        // get chapter outline
        var chaptersOulineContent = [];
        for (var i = 0; i < chaptersContent.length; i++) {
            if (chaptersContent[i].isOutline == true) {
                chaptersOulineContent.push(chaptersContent[i]);
            }
        }
        // get lesonIDMin and Max of chapter outline
        var lessonIDMinOutline = chaptersOulineContent[0].lessonContent[0].lessonID;
        var lessonIDMaxOutline = chaptersOulineContent[chaptersOulineContent.length - 1].lessonContent[chaptersOulineContent[chaptersOulineContent.length - 1].lessonContent.length - 1].lessonID;
        var lesson = await lessonModel.getLessonByID(lessonIDMinOutline);
        var lessonOutline = await lessonModel.getLessonByID(lessonIDMinOutline);

        if (check == false) {
            res.render('render', {
                contain: 'student/watch',
                title: 'Home',
                js: ['watch-video', 'watch'],
                css: ['watch'],
                check: false,
                courseName: courseName,
                chapters: chaptersOulineContent,
                lessonID: lessonIDMinOutline,
                courseID: courseID,
                videoPath: lessonOutline[0].videoPath,
                lessonIDMin: lessonIDMinOutline,
                lessonIDMax: lessonIDMaxOutline,
                lessonName: lessonOutline[0].lessonName,
                notRegistered: 1
            });
        }
        else {
            res.render('render', {
                contain: 'student/watch',
                title: 'Home',
                js: ['watch-video', 'watch'],
                css: ['watch'],
                courseName: courseName,
                chapters: chaptersContent,
                lessonID: lessonIDMin,
                courseID: courseID,
                videoPath: lesson[0].videoPath,
                lessonIDMin: lessonIDMin,
                lessonIDMax: lessonIDMax,
                lessonName: lesson[0].lessonName,
                notRegistered: 0
            });
        }
    } catch (err) {
        next(err);
    }
})

router.post('/get-video', auth.studentAuth, async (req, res, next) => {
    try {
        var studentID = req.session.user.studentID;
        var lessonID = req.body.lessonID;
        var courseID = req.body.courseID;
        // get registeredcourse
        var regsiteredCourse = await registeredCourseModel.getByStudentIDCourseID(studentID, courseID);
        //update % compplete
        if (regsiteredCourse.length > 0) {
            //update % compplete
            if (lessonID > regsiteredCourse[0].curLesson) {
                await registeredCourseModel.updateCurLesson(studentID, courseID, lessonID);
            }
        }
        //get video path
        var lesson = await lessonModel.getLessonByID(lessonID);
        res.json({
            videoPath: lesson[0].videoPath,
            lessonID: lessonID,
            lessonName: lesson[0].lessonName
        })

    } catch (err) {
        next(err);
    }
})

router.get('/rate', auth.studentAuth, async (req, res, next) => {
    try {
        var courseID = req.query.courseID;
        var studentID = req.session.user.studentID;
        // check registered course by student
        var courses = await courseModel.getRegisteredCourseByStudentID(studentID);
        var checkRegistered = false;
        for (var i = 0; i < courses.length; i++) {
            if (courses[i].courseID == courseID) {
                checkRegistered = true;
                break;
            }
        }
        // end check
        var courseInformation = await courseModel.getCourseByID(courseID);
        var rateInformation = await ratingModel.getRatingByCourseID(courseID);
        var widthStar = parseFloat(courseInformation[0].averageStar) / 5 * 100;
        widthStar = widthStar + '%';
        if (checkRegistered == false) {
            console.log("ban chua dang ki khoa hoc");
            // Chuyen den trang xem danh gia.
        } else {
            // check did user rate course
            var checkRated = false;
            var userRating;
            var widthUserStar = 0;
            var userComment = '';
            var rates = await ratingModel.getRatingBystudentID(studentID);
            for (var i = 0; i < rates.length; i++) {
                if (courseID == rates[i].courseID) {
                    checkRated = true;
                    // if user rated, get their comment and NOStars
                    userRating = { NoStars: rates[i].NoStars, comment: rates[i].comment };
                    widthUserStar = parseInt(userRating.NoStars) / 5 * 100;
                    userComment = userRating.comment;
                    break;
                }
            }
            res.render('render', {
                contain: 'student/rate',
                title: 'Home',
                js: ['rate'],
                css: ['rate'],
                course: courseInformation[0],
                rateCount: rateInformation.length,
                widthStar: widthStar,
                studentID: studentID,
                checkRated: checkRated,
                userRating: userRating,
                widthUserStar: widthUserStar + '%',
                userComment: userComment
            });
        }

    } catch (err) {
        next(err);
    }
})

router.post('/rate', auth.studentAuth, async (req, res, next) => {
    try {
        var comment = req.body.comment;
        var studentID = req.session.user.studentID;
        var courseID = req.body.courseID;
        var NoStars = req.body.NoStars;
        // Add rating
        await ratingModel.createRating(courseID, studentID, NoStars, comment);
        // Change averageStar of course
        var rates = await ratingModel.getRatingByCourseID(courseID);
        sumOfStars = 0;
        for (var i = 0; i < rates.length; i++) {
            sumOfStars += rates[i].NoStars;
        }
        var averageStar = sumOfStars / rates.length;
        await courseModel.updateAverageStar(courseID, averageStar);
        res.json({
            ok: true,
        })

    } catch (err) {
        next(err);
    }
})

router.post('/change-password', auth.studentAuth, async (req, res, next) => {
    try {
        var studentID = req.session.user.studentID;
        var oldPassword = req.body.oldPassword;
        var newPassword = req.body.newPassword;
        const salt = bcrypt.genSaltSync(10);
        const newPasswordHash = bcrypt.hashSync(newPassword, salt);
        var student = await studentModel.getProfile(studentID);
        var checkPassword = await bcrypt.compare(oldPassword, student[0].password);
        if (checkPassword == true) {
            studentModel.updatePassword(studentID, newPasswordHash);
            res.json({
                status: 0,
                message: "đổi password thành công"
            })
        } else {
            res.json({
                status: 1,
                message: "password nhập vào không đúng"
            })
        }
    } catch (err) {
        next(err);
    }
})
module.exports = router;