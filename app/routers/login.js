const express = require("express");
const router = express.Router();
const loginModel = require("../model/login.js");
const guestModel = require("../model/guest.js");
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
    if (login) {
      const top = await guestModel.top();
      const topview = await guestModel.topview();
      const newest = await guestModel.newest();
      const hot = await guestModel.hot();
      res.render("home", {
        css: ["guest"],
        js: [""],
        contain: "guest/guest",
        title: "Home",
        top: top,
        topview: topview,
        newest: newest,
        hot: hot,
      });
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
