const express = require('express');
const router = express.Router();
const teacherModel = require('../model/teacher.js');
const courseModel = require('../model/course.js');
const watchListModel = require('../model/watchList.js');
const chapterModel = require('../model/chapter.js');
const lessonModel = require('../model/lesson.js');
const ratingModel = require('../model/rating.js');
const categoryModel = require('../model/category.js');
const postCategoryModel = require('../model/postCategory.js');
const helper = require('../helper/pagination');
const url = require('url');
const bcrypt = require('bcrypt');
const auth = require('../middleware/auth.mdw');
const fs = require('fs');

//multer
var multer = require('multer');
var imageMimeTypes = ['video/mp4'];
var storage = multer.diskStorage({
    destination: function (req, file, next) {
        next(null, 'public/uploads/video')
    },
    filename: function (req, file, next) {
        next(null, file.fieldname + '-' + Date.now() + '.mp4')
    }
})

var upload = multer({
    storage: storage,
    fileFilter: (req, file, next) => {
        next(null, imageMimeTypes.includes(file.mimetype))
    }
})


router.get('/', auth.teacherAuth, async (req, res, next) => {
    try {
        var courses;
        var teacherID = req.session.user.teacherID;
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

router.get('/add-course', auth.teacherAuth, async (req, res, next) => {
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

router.post('/get-category', auth.teacherAuth, async (req, res, next) => {
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

router.post('/post-course', auth.teacherAuth, async (req, res, next) => {
    try {
        var teacherID = req.session.user.teacherID;
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
        res.json({
            status: 0,
        })

    } catch (err) {
        next(err);
    }
})

router.get('/update-course-info', auth.teacherAuth, async (req, res, next) => {
    try {
        var teacherID = req.session.user.teacherID;
        var courseID = req.query.courseID;
        var postCategory = await postCategoryModel.getAll();
        var courseInfo = await courseModel.getCourseByID(courseID);
        var categoryInfo = await categoryModel.getByID(courseInfo[0].categoryID);
        var postCategoryInfo = await postCategoryModel.getByID(categoryInfo[0].postCategoryID);
        res.render('render', {
            contain: 'teacher/update-course-info',
            title: 'Update course',
            js: ['teacher-course', 'teacher', 'teacher-update-course-info', 'simpleFormatMoney'],
            css: ['admin-index'],
            postCategory: postCategory,
            course: courseInfo[0],
            categoryInfo: categoryInfo[0],
            postCategoryInfo: postCategoryInfo[0],
            courseID: courseID
        })
    } catch (err) {
        next(err);
    }
})

router.post('/update-course', auth.teacherAuth, async (req, res, next) => {
    try {
        var teacherID = req.session.user.teacherID;
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
        await courseModel.update(teacherID, courseInfo);
        res.json({
            status: 0,
        })

    } catch (err) {
        next(err);
    }
})


router.get('/update-course-content', auth.teacherAuth, async (req, res, next) => {
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

router.post('/delete-lesson', auth.teacherAuth, async (req, res, next) => {
    try {
        var lessonID = req.body.lessonID;
        lesson = await lessonModel.getLessonByID(lessonID);
        await lessonModel.delete(lessonID);
        videoPath = './public' + lesson[0].videoPath;
        fs.unlink(videoPath, function (err) {
            // res.json({
            //     status: 1,
            //     message: 'File không có'
            // })
            next(err);
        });
        res.json({
            status: 0,
            message: 'Xóa thành công'
        })
    } catch (err) {
        next(err);
    }
})

router.post('/delete-chapter', auth.teacherAuth, async (req, res, next) => {
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

router.post('/add-lesson', auth.teacherAuth, upload.single('lessonVideo'), async (req, res, next) => {
    try {
        var courseID = req.body.inputModalCourseID;
        var lessonName = req.body.lessonName;
        var chapterID = req.body.inputModalchapterID;
        if (req.file) {
            var videoPath = '/uploads/video/' + req.file.filename;
            await lessonModel.add(lessonName, videoPath, chapterID);
            res.redirect(url.format({
                pathname: '/teacher/update-course-content',
                query: {
                    courseID: courseID,
                    result: "passed"
                }
            }));
        } else {
            res.redirect(url.format({
                pathname: '/teacher/update-course-content',
                query: {
                    courseID: courseID,
                    result: "failed"
                }
            }));
        }
    } catch (err) {
    }
})

router.post('/add-chapter', auth.teacherAuth, async (req, res, next) => {
    try {
        var chapterName = req.body.chapterName;
        var courseID = req.body.courseID;
        var isOutline = false; // default
        await chapterModel.add(chapterName, courseID, isOutline);
        res.json({
            status: 0,
            message: 'Thêm dữ liệu thành công'
        })
    } catch (err) {
        next(err);
    }
})

router.post('/edit-chapter', auth.teacherAuth, async (req, res, next) => {
    try {
        var chapterName = req.body.chapterName;
        var isOutline = req.body.isOutline;
        var chapterID = req.body.chapterID;
        await chapterModel.update(chapterID, chapterName, isOutline);
        res.json({
            status: 0,
            message: 'Sửa chương học thành công'
        })
    } catch (err) {
        next(err);
    }
})

router.post('/edit-lesson', auth.teacherAuth, upload.single('lessonVideo'), async (req, res, next) => {
    try {
        var lessonID = req.body.inputModalLessonID;
        var courseID = req.body.inputModalCourseID;
        var lessonName = req.body.lessonName;
        if (req.file) {
            var videoPath = '/uploads/video/' + req.file.filename;
            var lessons = await lessonModel.getLessonByID(lessonID);
            var oldVideoPath = './public' + lessons[0].videoPath;
            if (oldVideoPath != './public/uploads/video/default.mp4') {
                fs.unlink(oldVideoPath, function (err) {
                    if (err) {
                        next(err);
                    }
                });
            }
            await lessonModel.update(lessonName, videoPath, lessonID);
            res.redirect(url.format({
                pathname: '/teacher/update-course-content',
                query: {
                    courseID: courseID,
                    result: "passed"
                }
            }));
        } else {
            res.redirect(url.format({
                pathname: '/teacher/update-course-content',
                query: {
                    courseID: courseID,
                    result: "failed"
                }
            }));
        }
    } catch (err) {
    }
})

router.get('/profile', auth.adminTeacherAuth, async (req, res, next) => {
    try {
        if ((req.query.teacherID == null) || (req.query.teacherID.trim() == '')) {
            req.query.teacherID = 1;
        }
        var teacherID
        if (req.session.user.role == 'admin') {
            teacherID = req.query.teacherID;
        } else {
            var teacherID = req.session.user.teacherID;
        }
        var teacher = await teacherModel.getByID(teacherID);
        res.render('render', {
            contain: 'teacher/profile',
            title: 'Đăng khóa học',
            js: ['teacher', 'teacher-profile'],
            css: ['admin-index'],
            teacher: teacher[0]
        })
    } catch (err) {
        next(err);
    }
})


router.get('/profile-edit', auth.teacherAuth, async (req, res, next) => {
    try {
        if ((req.query.teacherID == null) || (req.query.teacherID.trim() == '')) {
            req.query.teacherID = 1;
        }
        var teacherID
        if (req.session.user.role == 'admin') {
            teacherID = req.query.teacherID;
        } else {
            var teacherID = req.session.user.teacherID;
        }
        var teacher = await teacherModel.getByID(teacherID);
        res.render('render', {
            contain: 'teacher/profile-edit',
            title: 'Đăng khóa học',
            js: ['teacher'],
            css: ['admin-index'],
            teacher: teacher[0]
        })
    } catch (err) {
        next(err);
    }
})


//multer
var multer2 = require('multer');
var imageMimeTypes2 = ['image/jpeg', 'image/png'];
var storage2 = multer.diskStorage({
    destination: function (req, file, next) {
        next(null, 'public/uploads/img/avatar')
    },
    filename: function (req, file, next) {
        next(null, file.fieldname + '-' + Date.now() + '.jpg')
    }
})
var upload2 = multer2({
    storage: storage2,
    fileFilter: (req, file, next) => {
        next(null, imageMimeTypes2.includes(file.mimetype))
    }
})

router.post('/profile-edit', auth.teacherAuth, upload2.single('fileAvatar'), async (req, res, next) => {
    try {
        if ((req.query.teacherID == null) || (req.query.teacherID.trim() == '')) {
            req.query.teacherID = 1;
        }
        var teacherID
        if (req.session.user.role == 'admin') {
            teacherID = req.query.teacherID;
        } else {
            var teacherID = req.session.user.teacherID;
        }
        var teacher = await teacherModel.getByID(teacherID);
        var name = req.body.teacherName;
        var phone = req.body.teacherPhone;
        var dateOfBirth = req.body.dateOfBirth;
        var email = req.body.teacherEmail;
        if (req.file) {
            avatarPath = '/uploads/img/avatar/' + req.file.filename;
            if (teacher[0].avatarPath != '/img/avatar/default.jpg') {
                const fs = require('fs');
                let oldAvatarPath = './public' + teacher[0].avatarPath;
                console.log(oldAvatarPath);
                fs.unlink(oldAvatarPath, function (err) {
                    if (err) {
                        next(err);
                    }
                });
            }
        } else {
            avatarPath = teacher[0].avatarPath;
        }
        await teacherModel.update(teacherID, name, phone, dateOfBirth, avatarPath, email);
        res.redirect(url.format({
            pathname: '/teacher/profile',
            query: {
                result: "passed"
            }
        }));
    } catch (err) {
        res.redirect(url.format({
            pathname: '/teacher/profile',
            query: {
                result: "failed"
            }
        }));
    }
})

router.post('/change-password', auth.teacherAuth, async (req, res, next) => {
    try {
        if ((req.query.teacherID == null) || (req.query.teacherID.trim() == '')) {
            req.query.teacherID = 1;
        }
        var teacherID
        if (req.session.user.role == 'admin') {
            teacherID = req.query.teacherID;
        } else {
            var teacherID = req.session.user.teacherID;
        }
        var oldPassword = req.body.oldPassword;
        var newPassword = req.body.newPassword;
        console.log(oldPassword);
        console.log(newPassword);
        const salt = bcrypt.genSaltSync(10);
        const newPasswordHash = bcrypt.hashSync(newPassword, salt);
        var teacher = await teacherModel.getByID(teacherID);
        var checkPassword = await bcrypt.compare(oldPassword, teacher[0].password);
        if (checkPassword == true) {
            teacherModel.updatePassword(teacherID, newPasswordHash);
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


router.post('/capnhat-course',auth.teacherAuth, upload2.single('courseImage'), async (req, res, next) => {
    try {
        var htmlCourseSortDes = req.body.htmlCourseSortDes;
        var htmlCourseDes = req.body.htmlCourseDes;
        var courseSortDes = req.body.courseSortDes;
        var courseDes = req.body.courseDes;
        var courseName = req.body.courseName;
        var courseID = req.body.courseID;
        courses = await courseModel.getCourseByID(courseID);
        var imagePath
        if (req.file) {
            var imagePath = '/uploads/img/avatar/' + req.file.filename;
            var oldImagePath = './public' + courses[0].imagePath;
            fs.unlink(oldImagePath, function (err) {
                if (err) {
                    next(err);
                }
            });
        } else {
            imagePath = courses[0].imagePath;
        }
        await courseModel.update(courseName, courseDes, courseSortDes, htmlCourseDes, htmlCourseSortDes, imagePath, courseID);
        res.redirect(url.format({
            pathname: '/teacher',
            query: {
                result: "passed"
            }
        }));
    } catch (err) {
        next(err);
    }
})

module.exports = router;
