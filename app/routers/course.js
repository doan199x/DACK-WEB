const express = require("express");
const router = express.Router();
const helper = require("../helper/pagination");
const courseModel = require("../model/course.js");
const studentModel = require("../model/student.js");
const guestModel = require("../model/guest.js");

router.get("/", async (req, res) => {
  const category = await guestModel.category();
  if (req.query.page == null || req.query.page.trim() == "") {
    req.query.page = 1;
  }
  if (req.query.perPage == null || req.query.perPage.trim() == "") {
    req.query.perPage = 5;
  }
  const all = await courseModel.all();
  for (var i = 0; i < all.length; i++) {
    all[i].widthStar = (all[i].averageStar / 5) * 100;
    all[i].widthStar += "%";
  }
  const page = req.query.page;
  const perPage = req.query.perPage;

  const pagingInfo = helper.pagination(all, page, perPage, all.length);
  // add width star
  for (let i = 0; i < category.length; i++) {
    if (category[i].postCategoryID === 1)
      category[i].postCategoryName = "💻 " + category[i].postCategoryName;
    if (category[i].postCategoryID === 2)
      category[i].postCategoryName = "🍜 " + category[i].postCategoryName;
    if (category[i].postCategoryID === 3)
      category[i].postCategoryName = "📓 " + category[i].postCategoryName;
    if (category[i].postCategoryID === 4)
      category[i].postCategoryName = "🔠 " + category[i].postCategoryName;
  }
  try {
    res.render("home", {
      css: ["course", "rate"],
      js: ["course"],
      contain: "course/course",
      courses: pagingInfo.objectOnPage,
      pagingInfo: pagingInfo,
      currentPage: page,
      perPage: perPage,
      category:category
    });
  } catch (err) {
    console.log(err);
  }
});

router.get("/find", async (req, res) => {
  const category = await guestModel.category();
  try {
    let courses;
    if (req.query.page == null || req.query.page.trim() == "") {
      req.query.page = 1;
    }
    if (req.query.perPage == null || req.query.perPage.trim() == "") {
      req.query.perPage = 3;
    }
    if (req.query.search === null || req.query.search.trim() === "") {
      courses = await courseModel.getAll();
    } else {
      courses = await courseModel.fulltext(req.query.search);
    }
    // add width star
    for (let i = 0; i < courses.length; i++) {
      courses[i].widthStar = (courses[i].averageStar / 5) * 100;
      courses[i].widthStar += "%";
    }
    for (let i = 0; i < category.length; i++) {
      if (category[i].postCategoryID === 1)
        category[i].postCategoryName = "💻 " + category[i].postCategoryName;
      if (category[i].postCategoryID === 2)
        category[i].postCategoryName = "🍜 " + category[i].postCategoryName;
      if (category[i].postCategoryID === 3)
        category[i].postCategoryName = "📓 " + category[i].postCategoryName;
      if (category[i].postCategoryID === 4)
        category[i].postCategoryName = "🔠 " + category[i].postCategoryName;
    }
    const page = req.query.page;
    const perPage = req.query.perPage;
    const pagingInfo = helper.pagination(courses, page, perPage, courses.length);
    res.render("home", {
      css: ["course", "rate"],
      js: ["course"],
      contain: "course/course",
      courses: pagingInfo.objectOnPage,
      pagingInfo: pagingInfo,
      currentPage: page,
      perPage: perPage,
      category:category
    });
  } catch (err) {
    console.log(err);
  }
});

router.get("/detail", async (req, res) => {
  const category = await guestModel.category();
  try {
    res.render("home", {
      css: ["course", "rate"],
      js: ["course"],
      contain: "course/course-detail",
      category:category
    });
  } catch (err) {
    console.log(err);
  }
});

router.get('/buy', async (req, res, next) => {
  try {
    var studentID = 1;
    var courseID = req.query.courseID;
    registeredCourses = await courseModel.getRegisteredCourseByStudentID(studentID);
    var checkRegisteredCourse = false;
    for (var i = 0; i < registeredCourses.length; i++) {
      if (registeredCourses[i].studentID == studentID || registeredCourses[i].courseID == courseID) {
        checkRegisteredCourse = true;
        break;
      }
    }
    // get student balance
    var students = await studentModel.getProfile(studentID);
    var studentBalance = students[0].balance;
    // get course information
    var course = await courseModel.getCourseByID(courseID);
    course[0].widthStar = course[0].averageStar / 5 * 100 + '%';
    var checkConditionToBuy = course[0].price <= studentBalance ? true : false;
    console.log(checkConditionToBuy);
    afterBalance = studentBalance - course[0].price;
    res.render('render', {
      contain: 'course/buy',
      course: course[0],
      css: ['rate'],
      js: ['buy'],
      checkConditionToBuy: checkConditionToBuy,
      checkRegisteredCourse: checkRegisteredCourse,
      studentID: studentID,
      courseID: courseID,
      studentBalance: studentBalance,
      afterBalance: afterBalance
    })
  } catch (err) {
    next(err);
  }
})

router.post('/buy', async (req, res, next) => {
  try {
    studentID = req.body.studentID;
    courseID = req.body.courseID;
    // check is course registered by this user;
    var registeredCourses = await courseModel.getRegisteredCourseByStudentID(studentID);
    checkRegisteredCourse = false;
    for (var i = 0; i < registeredCourses.length; i++) {
      if (registeredCourses[0].courseID == courseID) {
        checkRegisteredCourse = true;
        break;
      }
    }
    if (checkRegisteredCourse == true) {
      res.json({
        status: 1,
        message: 'Bạn đã mua khóa học này'
      })
    } else {
      // check do user have enough balance to buy
      var courses = await courseModel.getCourseByID(courseID);
      var students = await studentModel.getProfile(studentID);
      var checkBalance = students[0].balance < courses[0].price ? false : true;
      if (checkBalance == true) {

        await courseModel.buy(studentID, courseID, Date.now());
        var newBalance = students[0].balance - courses[0].price;
        await studentModel.updateBalance(studentID, newBalance);
        res.json({
          status: 0,
          message: 'Mua khóa học thành công',
          courseID: courseID
        })
      } else {
        res.json({
          status: 2,
          message: 'Không đủ tiền để mua khóa học'
        })
      }

    }
  } catch (err) {
    next(err);
  }
})

module.exports = router;
