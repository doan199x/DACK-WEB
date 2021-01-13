const express = require("express");
const router = express.Router();
const loginModel = require("../model/login.js");
const guestModel = require("../model/guest.js");
const auth = require("../middleware/auth.mdw");
const moment = require('moment');
const teacherModel = require('../model/teacher');
const studentModel = require('../model/student');
const adminModel = require('../model/admin');
// const modelname = require('../models/modelname');

router.get("/",async (req,res) => {
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
    var checkTeacher = false;
    var teachers = await teacherModel.checkLogin(req.body.email,req.body.password);
    if (teachers.length > 0){
      checkTeacher = true;
    }
    // check is student
    var checkStudent = false;
    var students = await studentModel.checkLogin(req.body.email,req.body.password);
    if (students.length > 0){
      checkStudent = true;
    }
    // check is admin
    var checkAdmin = false;
    var admins = await adminModel.checkLogin(req.body.email,req.body.password);
    if (admins.length > 0){
      checkAdmin = true;
    }
    if (checkStudent == false && checkTeacher == false && checkAdmin == false){
      // ten dang nhap hoac mat khau khong dung
      res.render("home", {
        css: ["login"],
        js: ["login"],
        contain: "guest/login/login",
        title: "Login",
        result: 0
      });
    }
    else if (checkTeacher == true){
      req.session.user = teachers[0];
      req.session.user.role = 'teacher';
      // redirect teacher index
    } else if (checkStudent == true){
      req.session.user = students[0];
      req.session.user.role = 'student';
      console.log(req.session.user);
      res.redirect('/');
    } else if(checkAdmin == true){
      req.session.user = admins[0];
      req.session.user.role = 'admin';
      res.redirect('/admin');
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
