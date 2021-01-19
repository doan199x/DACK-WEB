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
    const fullcategory = await guestModel.fullcategory();
    const postcategory = await guestModel.postcategory();
    const category = await guestModel.category();
    //top
    for (let i = 0; i < top.length; i++) {
      if (top[i].stars === null) top[i].stars = 0;
      else {
        top[i].widthStar = (top[i].stars / 5) * 100;
        top[i].widthStar += "%";
      }
      if (top[i].NoRates === null) top[i].NoRates = 0;
      if (top[i].views === null) top[i].views = 0;
    }

    //topview
    for (var i = 0; i < topview.length; i++) {
      if (topview[i].stars === null) top[i].stars = 0;
      else {
        topview[i].widthStar = (topview[i].stars / 5) * 100;
        topview[i].widthStar += "%";
      }
      if (topview[i].NoRates === null) topview[i].NoRates = 0;
      if (topview[i].views === null) topview[i].views = 0;
      if (topview[i].percent) 
      {
        topview[i].saleprice = topview[i].price - (topview[i].price)*(topview[i].percent)/100;
        topview[i].saleColor = "#66bb6a"
      }
    }
    //newest
    for (var i = 0; i < newest.length; i++) {
      if (newest[i].stars === null) newest[i].stars = 0;
      else {
        newest[i].widthStar = (newest[i].stars / 5) * 100;
        newest[i].widthStar += "%";
      }
      if (newest[i].NoRates === null) newest[i].NoRates = 0;
      if (newest[i].views === null) newest[i].views = 0;
      if (newest[i].percent) 
      {
        newest[i].saleprice = newest[i].price - (newest[i].price)*(newest[i].percent)/100;
        newest[i].saleColor = "#66bb6a"
      }
    }

    //hot
    for (var i = 0; i < hot.length; i++) {
      if (hot[i].stars === null) hot[i].stars = 0;
      else {
        hot[i].widthStar = (hot[i].stars / 5) * 100;
        hot[i].widthStar += "%";
        hot[i].widthChart = (hot[i].NoReStudent / hot[0].NoReStudent) * 100;
        hot[i].widthChart += "%";
      }
      if (hot[i].NoRates === null) hot[i].NoRates = 0;
      if (hot[i].views === null) hot[i].views = 0;
      if (i === 0) hot[i].chartColor = "#ff5722";
      else if (i === 1) hot[i].chartColor = "#ffeb3b";
      else if (i === 2) hot[i].chartColor = "#8bc34a";
      else if (i === 3) hot[i].chartColor = "#80deea";
      else if (i === 4) hot[i].chartColor = "#c5cae9";
    }
    //category
    for (let i = 0; i < postcategory.length;i++){
      postcategory[i].children = [];
      for (let j = 0; j<fullcategory.length;j++){
        if (postcategory[i].postCategoryName === fullcategory[j].postCategoryName )
        {
          postcategory[i].children.push(fullcategory[j].categoryName);
        }
      }
    }
    
    res.render("home", {
      css: ["guest", "rate", "header"],
      contain: "guest/guest",
      title: "Home",
      top: top,
      topview: topview,
      newest: newest,
      hot: hot,
      category: category,
      fullcategory: fullcategory,
      postcategory: postcategory
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
