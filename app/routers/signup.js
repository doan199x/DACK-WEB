const express = require("express");
const bcrypt = require('bcrypt');
const router = express.Router();
const mailer = require("../model/mailer");
const signupModel = require("../model/signup");
// const modelname = require('../models/modelname');

router.get("/", async (req, res) => {
  res.render("home", {
    css: ["signup"],
    js: ["signup"],
    contain: "guest/signup/signup",
    title: "Sign Up",
  });
});

var otpArr = [];

router.post("/", async (req, res, next) => {
  //Check if email is existedd
  try {
    if (req.body.email === "")
      res.json({
        status: "email",
      });
    else if (req.body.password !== req.body.confirmpassword) {
      res.json({
        status: "password",
      });
    } else {
      const isExisted = await signupModel.checkEmail(req.body.email);
      if (isExisted[0].count != 0) {
        //Thông báo
        res.json({
          status: "existed",
        });
      } else {
        const otp = Math.floor(100000 + Math.random() * 900000);
        console.log(otp);
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
        otpArr.push({
          otp: otp,
          email: req.body.email,
          password: hash,
        });
        mailer.sendKeyToEmail(req.body.email, otp); //Gửi OTP qua email
        // if (isCreated.affectedRows === 1) {
        //Đã tạo OTP thành công

        mailer.sendKeyToEmail(req.body.email, otp); //Gửi OTP qua email
        //Chuyển qua trang nhập OTP
        res.json({
          status: "ok",
          email: req.body.email
        });
      }
    }
  } catch (error) {
    //Thông báo
    next(error);
  }
});

router.get("/otp", (req, res, next) => {
  try {
    email = req.query.email;
    res.render("home", {
      css: ["otp"],
      js: ["signup"],
      contain: "guest/signup/otp",
      title: "OTP",
      email: email
    });
  } catch (err) {
    next(err);
  }
});

router.post("/compare-otp", async (req, res) => {
  try {
    if (req.body.otp == null) {
      console.log("OTP không được bỏ trống!");
      res.json({
        status: "fail",
      });
    } else {
      let check = false;
      let indexCheck = -1;
      for (let i = 0; i < otpArr.length; i++) {
        if (
          otpArr[i].otp == req.body.otp &&
          otpArr[i].email == req.body.email
        ) {
          check = true;
          indexCheck = i;
          break;
        }
      }
      if (check == false) {
        res.json({
          status: "fail",
        });
      } else {

        //Insert vào db
        console.log(otpArr);
        const result = await signupModel.signup(
          otpArr[indexCheck].email,
          otpArr[indexCheck].password
        );
        console.log(result);
        //Xóa trong mảng toàn cục
        if (result.affectedRows != 1) {
          res.json({
            status: "fail",
          });
        } else
        {
          otpArr.splice(indexCheck,1);
          res.json({
            status: "done",
          });
        }        
      }
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
