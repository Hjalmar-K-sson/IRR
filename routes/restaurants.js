//Requiring Express
const express = require("express");
//Starting the Express Router
const router = express.Router();
//Requiring the Restaurant model
const Restaurant = require("../public/javascripts/models/restaurant");

router.get("/", async (req, res) => {
  const restaurants = await Restaurant.find({});
  // console.log(restaurants);
  res.render("./restaurants/index", { restaurants });
});

module.exports = router;
