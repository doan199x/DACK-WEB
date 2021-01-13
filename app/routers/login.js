const express = require("express");
const router = express.Router();
const loginModel = require("../model/login.js");
const guestModel = require("../model/guest.js");
const auth = require("../middleware/auth.mdw");
const moment = require('moment');
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
    const login = await loginModel.result(req.body.email, req.body.password);
    console.log(req.session);
    if (login) {
      res.redirect("/")
    } else {
      res.render("home", {
        css: ["login"],
        js: ["login"],
        contain: "guest/login/login",
        title: "Login",
        login,
      });
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
