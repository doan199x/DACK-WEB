const express = require("express");
const router = express.Router();
const helper = require("../helper/pagination");
const courseModel = require("../model/course.js");

router.get("/", async (req, res) => {
  if (req.query.page == null || req.query.page.trim() == "") {
    req.query.page = 2;
  }
  if (req.query.perPage == null || req.query.perPage.trim() == "") {
    req.query.perPage = 5;
  }
  const all = await courseModel.all();
  for (var i = 0; i < all.length; i++) {
    all[i].widthStar = (all[i].averageStar / 5) * 100;
    all[i].widthStar += "%";
  }
  var page = req.query.page;
  var perPage = req.query.perPage;

  const pagingInfo = helper.pagination(all, page, perPage, all.length);
  // add width star

  try {
    res.render("home", {
      css: ["course", "rate"],
      js: ["course"],
      contain: "course/course",
      courses: pagingInfo.objectOnPage,
      pagingInfo: pagingInfo,
      currentPage: page,
      perPage: perPage,
    });
  } catch (err) {
    console.log(err);
  }
});

router.get("/find", async (req, res) => {
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
    for (var i = 0; i < courses.length; i++) {
      courses[i].widthStar = (courses[i].averageStar / 5) * 100;
      courses[i].widthStar += "%";
    }
    var page = req.query.page;
    var perPage = req.query.perPage;
    var pagingInfo = helper.pagination(courses, page, perPage, courses.length);
    res.render("home", {
      css: ["course", "rate"],
      js: ["course"],
      contain: "course/course",
      courses: pagingInfo.objectOnPage,
      pagingInfo: pagingInfo,
      currentPage: page,
      perPage: perPage,
    });
  } catch (err) {
    console.log(err);
  }
});

router.get("/detail", async (req, res) => {
  try {
    res.render("home", {
      css: ["course", "rate"],
      js: ["course"],
      contain: "course/course-detail",
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
