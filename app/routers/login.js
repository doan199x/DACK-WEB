const express = require("express");
const router = express.Router();
const loginModel = require("../model/login.js");
const guestModel = require("../model/guest.js");
const auth = require("../middleware/auth.mdw");
const moment = require('moment');
const teacherModel = require('../model/teacher');
const studentModel = require('../model/student');
const adminModel = require('../model/admin');
const bcrypt = require('bcrypt');
// const modelname = require('../models/modelname');

router.get("/", async (req, res) => {
  res.render("home", {
    css: ["login"],
    js: ["login"],
    contain: "guest/login/login",
    title: "Login",
  });
});

router.post("/", async (req, res) => {
  try {
    // check is teacher
    let checkTeacher = false;

    const teachers = await teacherModel.checkLogin(req.body.email, req.body.password);
    if (teachers.length > 0) {
      console.log(teachers);
      if (bcrypt.compareSync(req.body.password, teachers[0].password)) checkTeacher = true;
    }
    // check is student
    var checkStudent = false;

    var students = await studentModel.checkLogin(req.body.email, req.body.password);
    if (students.length > 0) {
      if (bcrypt.compareSync(req.body.password, students[0].password)) checkStudent = true;
    }
    // check is admin
    var checkAdmin = false;

    var admins = await adminModel.checkLogin(req.body.email, req.body.password);
    if (admins.length > 0) {
      if (bcrypt.compareSync(req.body.password, admins[0].password)) checkAdmin = true;
    }
    if (checkStudent == false && checkTeacher == false && checkAdmin == false) {
      // ten dang nhap hoac mat khau khong dung
      res.render("home", {
        css: ["login"],
        js: ["login"],
        contain: "guest/login/login",
        title: "Login",
        result: 0
      });
    }
    else if (checkTeacher == true) {
      teacherInfo = await teacherModel.findByEmail(req.body.email);
      req.session.user = teacherInfo[0];
      req.session.user.role = 'teacher';
      res.redirect('/');
      // redirect teacher index
    } else if (checkStudent == true) {
      studentInfo = await studentModel.findByEmail(req.body.email);
      req.session.user = studentInfo[0];
      req.session.user.role = 'student';
      //console.log(req.session.user);
      res.redirect('/');
    } else if (checkAdmin == true) {
      adminInfo = await adminModel.findByEmail(req.body.email);
      req.session.user = adminInfo[0];
      req.session.user.role = 'admin';
      res.redirect('/admin');
    }
  } catch (error) {
    console.log(error);
  }
});
module.exports = router;
