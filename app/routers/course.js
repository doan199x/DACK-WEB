const express = require("express");
const router = express.Router();
const helper = require("../helper/pagination");
const courseModel = require("../model/course.js");
const studentModel = require("../model/student.js");
const guestModel = require("../model/guest.js");
const chapterModel = require("../model/chapter.js");
const lessonModel = require("../model/lesson.js");
const teacherModel = require("../model/teacher");
const registeredCourseModel = require("../model/registeredCourse");
const auth = require('../middleware/auth.mdw');

router.get("/", async (req, res) => {
  const fullcategory = await guestModel.fullcategory();
  const postcategory = await guestModel.postcategory();
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
        all[i].topColor = "#66bb6a";
      }
    }
    for (let i3 = 0; i3 < newest.length; i3++) {
      if (all[i].id === newest[i3].id) {
        all[i].newColor = "#0277bd";
      }
    }
    all[i].widthStar = (all[i].stars / 5) * 100;
    all[i].widthStar += "%";
    if (all[i].percent)
      all[i].saleprice = all[i].price - (all[i].price * all[i].percent) / 100;
    if (all[i].percent) {
      all[i].saleprice = all[i].price - (all[i].price * all[i].percent) / 100;
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
  //category
  for (let i = 0; i < postcategory.length; i++) {
    postcategory[i].children = [];
    for (let j = 0; j < fullcategory.length; j++) {
      if (postcategory[i].postCategoryName === fullcategory[j].postCategoryName) {
        postcategory[i].children.push(fullcategory[j].categoryName);
      }
    }
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
      fullcategory: fullcategory,
      postcategory: postcategory
    });
  } catch (err) {
    console.log(err);
  }
});

router.get("/find", async (req, res) => {
  const fullcategory = await guestModel.fullcategory();
  const postcategory = await guestModel.postcategory();
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
      req.query.perPage = 3;
    }
    if (req.query.search === null || (req.query.search.trim() === "")) {
      if (req.query.sortOption === "1") courses = await courseModel.all1();
      else if (req.query.sortOption === "2") courses = await courseModel.all2();
      else if (req.query.sortOption === "3") courses = await courseModel.all3();
      else courses = await courseModel.all();
    }
    //postcategory
    else if (req.query.search === "IT" || req.query.search === "THPT" ||
      req.query.search === "Nấu ăn" || req.query.search === "Tiếng Anh" ||
      req.query.search === "Lập trình web" || req.query.search === "Lập trình thiết bị di động"
      || req.query.search === "Nấu ăn căn bản" || req.query.search === "Nấu ăn chuyên nghiệp"
      || req.query.search === "Tiếng Anh Căn bản" || req.query.search === "Tiếng Anh giao tiếp"
      || req.query.search === "Toán" || req.query.search === "Lý" || req.query.search === "Hóa") {
      courses = await courseModel.relatedcatName(req.query.search);
    }
    else {

      //Sort
      if (req.query.sortOption === "1") {
        courses = await courseModel.fulltext1(req.query.search);
      }
      else if (req.query.sortOption === "2") {
        courses = await courseModel.fulltext2(req.query.search);
      }
      else if (req.query.sortOption === "3") {
        courses = await courseModel.fulltext3(req.query.search);
      }
      else {
        courses = await courseModel.fulltext(req.query.search);
      }
    }
    // add width star
    for (let i = 0; i < courses.length; i++) {
      for (let i2 = 0; i2 < top.length; i2++) {
        if (courses[i].id === top[i2].id) {
          courses[i].topColor = "#66bb6a";
        }
      }
      for (let i3 = 0; i3 < newest.length; i3++) {
        if (courses[i].id === newest[i3].id) {
          courses[i].newColor = "#0277bd";
        }
      }
      courses[i].widthStar = (courses[i].stars / 5) * 100;
      courses[i].widthStar += "%";
      if (courses[i].percent) {
        courses[i].saleprice =
          courses[i].price - (courses[i].price * courses[i].percent) / 100;
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
    //category
    for (let i = 0; i < postcategory.length; i++) {
      postcategory[i].children = [];
      for (let j = 0; j < fullcategory.length; j++) {
        if (postcategory[i].postCategoryName === fullcategory[j].postCategoryName) {
          postcategory[i].children.push(fullcategory[j].categoryName);
        }
      }
    }
    res.render("home", {
      css: ["course", "rate"],
      js: ["course"],
      contain: "course/course",
      courses: pagingInfo.objectOnPage,
      pagingInfo: pagingInfo,
      currentPage: page,
      perPage: perPage,
      category: category,
      fullcategory: fullcategory,
      postcategory: postcategory
    });
  } catch (err) {
    console.log(err);
  }
});

router.get("/detail", async (req, res) => {
  var studentID = 1;
  const fullcategory = await guestModel.fullcategory();
  const postcategory = await guestModel.postcategory();
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
  var courseID = req.query.courseID;
  var detail = await courseModel.detail(courseID);
  var chapterInfo = await chapterModel.getChaptersByCourseID(detail[0].id);
  // course info
  for (let i = 0; i < chapterInfo.length; i++) {
    chapterInfo[i].lessons = await lessonModel.getLessonsByChapterID(
      chapterInfo[i].chapterID
    );
  }

  // add width star
  detail[0].widthStar = (detail[0].stars / 5) * 100;
  detail[0].widthStar += "%";
  if (detail[0].percent) {
    detail[0].saleprice = detail[0].price - (detail[0].price * detail[0].percent) / 100;
    detail[0].saleColor = "#66bb6a";
  }
  //feedback
  var feedback = await courseModel.feedback(req.query.courseID);
  //5 realed courses
  var related = await courseModel.related(detail[0].categoryID);
  for (var i = 0; i < related.length; i++) {
    related[i].widthStar = (related[i].stars / 5) * 100;
    related[i].widthStar += "%";
    if (related[i].percent && related[i].percent != 0)
      related[i].saleprice = related[i].price - (related[i].price * related[i].percent) / 100;
  }

  for (let i = 0; i < feedback.length; i++) {
    feedback[i].widthStar = (feedback[i].NoStars / 5) * 100;
    feedback[i].widthStar += "%";
  }
  var checkFeedbackEmpty = false;
  if (feedback.length == 0) {
    checkFeedbackEmpty = true;
  }
  detail = detail[0];
  // get teacher Info:
  let teacher = await teacherModel.getByCourseID(courseID);
  // get course Info:
  let course = await courseModel.getCourseByID(courseID);
  // check user registered course
  let registered = await registeredCourseModel.getByStudentIDCourseID(studentID, courseID);
  var checkRegistered = false;
  if (registered.length > 0) {
    checkRegistered = true;
  }
  //category
  for (let i = 0; i < postcategory.length; i++) {
    postcategory[i].children = [];
    for (let j = 0; j < fullcategory.length; j++) {
      if (postcategory[i].postCategoryName === fullcategory[j].postCategoryName) {
        postcategory[i].children.push(fullcategory[j].categoryName);
      }
    }
  }
  try {
    res.render("home", {
      css: ["course", "rate", "course-detail"],
      js: ["course", 'course-detail'],
      contain: "course/course-detail",
      category: category,
      fullcategory: fullcategory,
      postcategory: postcategory,
      detail: detail,
      chapterInfo: chapterInfo,
      feedback: feedback,
      related: related,
      teacher: teacher[0],
      course: course[0],
      checkFeedbackEmpty: checkFeedbackEmpty,
      courseID: courseID,
      checkRegistered: checkRegistered
    });
  } catch (err) {
    next(err);
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

router.post("/buy", auth.studentAuth, async (req, res, next) => {
  try {
    var studentID = req.session.user.studentID;
    var courseID = req.body.courseID;
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
        message: "Bạn đã mua khóa học này",
      });
    } else {
      // check do user have enough balance to buy
      var courses = await courseModel.getCourseByID(courseID);
      var students = await studentModel.getProfile(studentID);
      var checkBalance = students[0].balance < courses[0].price ? false : true;
      if (checkBalance == true) {
        // get min Lesson of course for displaying completed
        //1. get first chapter of course
        var chapters = await chapterModel.getChaptersByCourseID(courseID);
        //2. get fist lesson of chapter
        var lessons = await lessonModel.getLessonsByChapterID(chapters[0].chapterID);
        await courseModel.buy(studentID, courseID, lessons[0].lessonID);
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

router.post('/add-watchlist',auth.studentAuth, async (req, res, next) => {
  try {
    var courseID = req.body.courseID;
    var studentID = req.session.user.studentID;
    list = await studentModel.getWatchList(studentID, courseID);
    if (list.length > 0) {
      res.json({
        status: 0,
        message: 'Them thanh cong'
      })
    } else {
      await studentModel.insertWatchList(studentID, courseID);
      res.json({
        status: 0,
        message: 'Them thanh cong'
      })
    }
  } catch (err) {
    next(err);
  }
})

module.exports = router;
