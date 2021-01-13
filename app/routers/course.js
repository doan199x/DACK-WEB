const express = require("express");
const course = require("../model/course.js");
const router = express.Router();

const courseModel = require("../model/course.js");

router.get("/", async (req, res) => {
  const all = await courseModel.all();
  try {
    res.render("home", {
      css: ["course"],
      js: [""],
      contain: "course/course",
      all: all,
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
