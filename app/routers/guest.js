const express = require("express");
const router = express.Router();

const guestModel = require("../model/guest.js");
// const modelname = require('../models/modelname');

router.get("/", async (req, res) => {
  try {
    const top = await guestModel.top();
    const topview = await guestModel.topview();
    const newest = await guestModel.newest();
    const hot = await guestModel.hot();
    const category = await guestModel.category();
    //top
    for (let i = 0; i < top.length; i++) {
      if (top[i].stars === null) top[i].stars = 0;
      else
      {
        top[i].widthStar = (top[i].stars / 5) * 100;
        top[i].widthStar += "%";
      }
      if (top[i].NoRates === null ) top[i].NoRates = 0;
      if (top[i].views === null ) top[i].views = 0;
    }

    //toview
    for (var i = 0; i < topview.length; i++) {
      if (topview[i].stars === null) top[i].stars = 0;
      else
      {
        topview[i].widthStar = (topview[i].stars / 5) * 100;
        topview[i].widthStar += "%";
      }
      if (topview[i].NoRates === null ) topview[i].NoRates = 0;
      if (topview[i].views === null ) topview[i].views = 0;
    }
//newest
    for (var i = 0; i < newest.length; i++) {
      if (newest[i].stars === null) newest[i].stars = 0;
      else
      {
        newest[i].widthStar = (newest[i].stars / 5) * 100;
        newest[i].widthStar += "%";
      }
      if (newest[i].NoRates === null ) newest[i].NoRates = 0;
      if (newest[i].views === null ) newest[i].views = 0;
    }

    //hot
    for (var i = 0; i < hot.length; i++) {
      hot[0].chartColor = "#ff5722";
      hot[1].chartColor = "#ffeb3b";
      hot[2].chartColor = "#8bc34a";
      hot[3].chartColor = "#80deea";
      hot[4].chartColor = "#c5cae9";
      if (hot[i].stars === null) hot[i].stars = 0;
      else
      {
        hot[i].widthStar = (hot[i].stars / 5) * 100;
        hot[i].widthStar += "%";
        hot[i].widthChart = ((hot[i].NoReStudent)/hot[0].NoReStudent)*100;
        hot[i].widthChart +="%";
      }
      if (hot[i].NoRates === null ) hot[i].NoRates = 0;
      if (hot[i].views === null ) hot[i].views = 0;
    }
    //category
    for (var i = 0; i < category.length; i++){
        if (category[i].postCategoryID === 1) category[i].postCategoryName = "💻 " + category[i].postCategoryName
        if (category[i].postCategoryID === 2) category[i].postCategoryName = "🍜 " +category[i].postCategoryName
        if (category[i].postCategoryID === 3) category[i].postCategoryName = "📓 " +category[i].postCategoryName
        if (category[i].postCategoryID === 4) category[i].postCategoryName = "🔠 " +category[i].postCategoryName
    }
    res.render("home", {
      css: ["guest","rate"],
      contain: "guest/guest",
      title: "Home",
      top: top,
      topview: topview,
      newest: newest,
      hot: hot,
      category: category
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
