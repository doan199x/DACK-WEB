const express = require("express");
const router = express.Router();
const helper = require("../helper/pagination");
const courseModel = require("../model/course.js");
const studentModel = require("../model/student.js");
const guestModel = require("../model/guest.js");
const chapterModel = require("../model/chapter.js");
const lessonModel = require("../model/lesson.js");

router.get("/", async (req, res) => {
  const category = await guestModel.category();
  const top = await guestModel.top();
  const newest = await guestModel.newest();
  if (req.query.page == null || req.query.page.trim() == "") {
    req.query.page = 1;
  }
  if (req.query.perPage == null || req.query.perPage.trim() == "") {
    req.query.perPage = 6;
  }
  const all = await courseModel.all();
  for (var i = 0; i < all.length; i++) {
    for (let i2 = 0; i2 < top.length; i2++) {
      if (all[i].id === top[i2].id) {
        all[i].topColor = "#ff5722";
      }
    }
    for (let i3 = 0; i3 < newest.length; i3++) {
      if (all[i].id === newest[i3].id) {
        all[i].newColor = "#0277bd";
      }
    }
    all[i].widthStar = (all[i].averageStar / 5) * 100;
    all[i].widthStar += "%";
    if (all[i].percent)
      all[i].saleprice = all[i].price - (all[i].price * all[i].percent) / 100;
    if (all[i].percent) {
      all[i].saleprice = all[i].price - (all[i].price * all[i].percent) / 100;
      all[i].saleColor = "#66bb6a";
    }
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
      category: category,
    });
  } catch (err) {
    console.log(err);
  }
});

router.get("/find", async (req, res) => {
  const category = await guestModel.category();
  //noi bat: top, moi: viet, giam gia
  const top = await guestModel.top();
  const newest = await guestModel.newest();
  try {
    var courses;
    if (req.query.page == null || req.query.page.trim() === "") {
      req.query.page = 1;
    }
    if (req.query.perPage == null || req.query.perPage.trim() === "") {
      req.query.perPage = 6;
    }
    if (req.query.search === null || req.query.search.trim() === "") {
      courses = await courseModel.all();
    } else {
      courses = await courseModel.fulltext(req.query.search);
    }
    // add width star
    for (let i = 0; i < courses.length; i++) {
      for (let i2 = 0; i2 < top.length; i2++) {
        if (courses[i].id === top[i2].id) {
          courses[i].topColor = "#ff5722";
        }
      }
      for (let i3 = 0; i3 < newest.length; i3++) {
        if (courses[i].id === newest[i3].id) {
          courses[i].newColor = "#0277bd";
        }
      }
      courses[i].widthStar = (courses[i].averageStar / 5) * 100;
      courses[i].widthStar += "%";
      if (courses[i].percent) {
        courses[i].saleprice =
          courses[i].price - (courses[i].price * courses[i].percent) / 100;
        courses[i].saleColor = "#66bb6a";
      }
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
    const pagingInfo = helper.pagination(
      courses,
      page,
      perPage,
      courses.length
    );
    res.render("home", {
      css: ["course", "rate"],
      js: ["course"],
      contain: "course/course",
      courses: pagingInfo.objectOnPage,
      pagingInfo: pagingInfo,
      currentPage: page,
      perPage: perPage,
      category: category,
    });
  } catch (err) {
    console.log(err);
  }
});

router.get("/detail", async (req, res) => {
  const category = await guestModel.category();
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
  const detail = await courseModel.detail(req.query.courseID);
  var chapterInfo = await chapterModel.getChaptersByCourseID(detail[0].id);
  // course info
  for (let i = 0; i < chapterInfo.length; i++) {
    chapterInfo[i].lessons = await lessonModel.getLessonsByChapterID(
      chapterInfo[i].chapterID
    );
  }
  // add width star
  detail[0].widthStar = (detail[0].averageStar / 5) * 100;
  detail[0].widthStar += "%";
  if (detail[0].percent) {
    detail[0].saleprice = detail[0].price - (detail[0].price * detail[0].percent) / 100;
    detail[0].saleColor = "#66bb6a";
  }
  //feedback
  const feedback = await courseModel.feedback(req.query.courseID);
  //5 realed courses
  const related = await courseModel.related(detail[0].categoryID);

  for (let i = 0;i<feedback.length;i++){
    feedback[i].widthStar = (feedback[i].NoStars / 5) * 100;
    feedback[i].widthStar += "%";
  }

  try {
    res.render("home", {
      css: ["course", "rate", "course-detail"],
      js: ["course"],
      contain: "course/course-detail",
      category: category,
      detail: detail,
      chapterInfo: chapterInfo,
      feedback: feedback,
      related: related
    });
  } catch (err) {
    console.log(err);
  }
});

router.get("/buy", async (req, res, next) => {
  try {
    var studentID = 1;
    var courseID = req.query.courseID;
    registeredCourses = await courseModel.getRegisteredCourseByStudentID(
      studentID
    );
    var checkRegisteredCourse = false;
    for (var i = 0; i < registeredCourses.length; i++) {
      if (
        registeredCourses[i].studentID == studentID ||
        registeredCourses[i].courseID == courseID
      ) {
        checkRegisteredCourse = true;
        break;
      }
    }
    // get student balance
    var students = await studentModel.getProfile(studentID);
    var studentBalance = students[0].balance;
    // get course information
    var course = await courseModel.getCourseByID(courseID);
    course[0].widthStar = (course[0].averageStar / 5) * 100 + "%";
    var checkConditionToBuy = course[0].price <= studentBalance ? true : false;
    console.log(checkConditionToBuy);
    afterBalance = studentBalance - course[0].price;
    res.render("render", {
      contain: "course/buy",
      course: course[0],
      css: ["rate"],
      js: ["buy"],
      checkConditionToBuy: checkConditionToBuy,
      checkRegisteredCourse: checkRegisteredCourse,
      studentID: studentID,
      courseID: courseID,
      studentBalance: studentBalance,
      afterBalance: afterBalance,
    });
  } catch (err) {
    next(err);
  }
});

router.post("/buy", async (req, res, next) => {
  try {
    studentID = req.body.studentID;
    courseID = req.body.courseID;
    // check is course registered by this user;
    var registeredCourses = await courseModel.getRegisteredCourseByStudentID(
      studentID
    );
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
        message: "Bạn đã mua khóa học này",
      });
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
          message: "Mua khóa học thành công",
          courseID: courseID,
        });
      } else {
        res.json({
          status: 2,
          message: "Không đủ tiền để mua khóa học",
        });
      }
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
