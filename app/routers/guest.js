const express = require("express");
const router = express.Router();

const guestModel = require("../model/guest.js");
// const modelname = require('../models/modelname');

router.get("/", async (req, res) => {
  try {
    const top = await guestModel.top();
    console.log(top[0].name);
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
     hot:hot,
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
