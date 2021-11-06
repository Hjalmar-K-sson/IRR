//Requiring Express
const express = require("express");
//Starting the Express Router
const router = express.Router();
//Requiring the Restaurant model
const Restaurant = require("../models/restaurant");

router.get("/", async (req, res) => {
  const restaurants = await Restaurant.find({});
  res.render("./restaurants/index", { restaurants });
});

module.exports = router;
