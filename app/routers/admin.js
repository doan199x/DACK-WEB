const express = require('express');
const router = express.Router();
const categoryModel = require('../model/category.js');
const postCategoryModel = require('../model/postCategory.js');
const courseModel = require('../model/course.js');
const chapterModel = require('../model/chapter.js')
const lessonModel = require('../model/lesson.js')
const studentModel = require('../model/student.js');
const teacherModel = require('../model/teacher.js');
const auth = require('../middleware/auth.mdw');
const helper = require('../helper/pagination');

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
            js: ['admin', 'admin-category'],
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

router.get('/course', async (req, res, next) => {
    try {
        var courses;
        if ((req.query.page == null) || (req.query.page.trim() == '')) {
            req.query.page = 1;
        }
        if ((req.query.perPage == null) || (req.query.perPage.trim() == '')) {
            req.query.perPage = 3;
        }
        if ((req.query.search == null) || (req.query.search.trim() == '')) {
            courses = await courseModel.getAll();
        } else {
            courses = await courseModel.findLikeName(req.query.search);
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
            contain: 'admin/admin-course',
            title: 'Quản lí khóa học',
            js: ['admin', 'admin-course'],
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

router.post('/delete-course', async (req, res, next) => {
    try {
        courseID = req.body.courseID;
        chapters = await chapterModel.getChaptersByCourseID(courseID);
        lessonsID = [];
        for (var i = 0; i < chapters.length; i++) {
            lessons = await lessonModel.getLessonsByChapterID(chapters[i].chapterID);
            for (var j = 0; j < lessons.length; j++) {
                lessonsID.push(lessons[j].lessonID);
            }
        }
        await courseModel.delete(courseID, lessonsID);
        res.json({
            status: 'deleted'
        })
    } catch (err) {
        next(err);
    }
})

router.get('/student', async (req, res, next) => {
    try {
        var students;
        if ((req.query.page == null) || (req.query.page.trim() == '')) {
            req.query.page = 1;
        }
        if ((req.query.perPage == null) || (req.query.perPage.trim() == '')) {
            req.query.perPage = 6;
        }
        if ((req.query.search == null) || (req.query.search.trim() == '')) {
            students = await studentModel.getAll();
        } else {
            students = await studentModel.findLikeName(req.query.search);
        }
        var page = req.query.page;
        var perPage = req.query.perPage;
        var pagingInfo = helper.pagination(students, page, perPage, students.length);
        console.log(pagingInfo.objectOnPage);
        res.render('render', {
            contain: 'admin/admin-qlhocsinh',
            title: 'Quản lí giáo viên',
            js: ['admin', 'admin-qlhocsinh'],
            css: ['admin-index'],
            students: pagingInfo.objectOnPage,
            pagingInfo: pagingInfo,
            currentPage: page,
            perPage: perPage
        });
    } catch (err) {
        next(err);
    }
})

router.post('/delete-student', async (req, res, next) => {
    try {
        // var studentID = req.body.studentID;
        // await studentModel.delete(studentID);
        //chua lam
        res.json({
            status: 'ok'
        })
    } catch (err) {
        next(err);
    }
})

router.get('/teacher', async (req, res, next) => {
    try {
        var teachers;
        if ((req.query.page == null) || (req.query.page.trim() == '')) {
            req.query.page = 1;
        }
        if ((req.query.perPage == null) || (req.query.perPage.trim() == '')) {
            req.query.perPage = 6;
        }
        if ((req.query.search == null) || (req.query.search.trim() == '')) {
            teachers = await teacherModel.getAll();
        } else {
            teachers = await teacherModel.findLikeName(req.query.search);
        }
        var page = req.query.page;
        var perPage = req.query.perPage;
        var pagingInfo = helper.pagination(teachers, page, perPage, teachers.length);
        res.render('render', {
            contain: 'admin/admin-qlgiaovien',
            title: 'Quản lí giáo viên',
            js: ['admin', 'admin-qlgiaovien'],
            css: ['admin-index'],
            teachers: pagingInfo.objectOnPage,
            pagingInfo: pagingInfo,
            currentPage: page,
            perPage: perPage
        });
    } catch (err) {
        next(err);
    }
})

router.post('/add-teacher', async (req, res, next) => {
    try {
        var name = req.body.tenGiaoVien;
        var email = req.body.emailGiaoVien;
        var password = req.body.matKhau;
        var confirmPassword = req.body.xacNhanMatKhau;
        var teachers = teacherModel.findByEmail(email);
        var avatarPath = '/img/avatar/default.jpg';
        if (name == "" || email == "" || password == "" || confirmPassword == "") {
            res.json({
                status: 3
                // mot trong cac o bi de trong
            })
        } else if (!helper.validateEmail(email)) {
            res.json({
                status: 4
                // email nhap vao khong  hop le
            })
        }
        else if (teachers.length > 0) {
            res.json({
                status: 1
                // da ton tai email
            })
        } else if (password != confirmPassword) {
            res.json({
                status: 2
                // mat khau khong khop
            })
        } else {
            var bcrypt = require('bcrypt');
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(password, salt);
            await teacherModel.add(name, email, hash, avatarPath);
            res.json({
                status: 0
                // dang ki thanh cong
            })
        }
    } catch (err) {
        next(err);
    }
})

router.post('/ban-teacher', async (req, res, next) => {
    try {
        var teacherID = req.body.teacherID;
        await teacherModel.ban(teacherID);
        res.json({
            status: 0,
            message: 'Cấm giáo viên thành công'
        })
    } catch (err) {
        next(err);
    }
})

router.post('/unban-teacher', async (req, res, next) => {
    try {
        var teacherID = req.body.teacherID;
        await teacherModel.unban(teacherID);
        res.json({
            status: 0,
            message: 'Cấm giáo viên thành công'
        })
    } catch (err) {
        next(err);
    }
})

router.post('/ban-student', async (req, res, next) => {
    try {
        var studentID = req.body.studentID;
        await studentModel.ban(studentID);
        res.json({
            status: 0,
            message: 'Cấm giáo viên thành công'
        })
    } catch (err) {
        next(err);
    }
})

router.post('/unban-student', async (req, res, next) => {
    try {
        var studentID = req.body.studentID;
        await studentModel.unban(studentID);
        res.json({
            status: 0,
            message: 'Cấm giáo viên thành công'
        })
    } catch (err) {
        next(err);
    }
})

module.exports = router;