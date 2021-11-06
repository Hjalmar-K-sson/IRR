//Requiring Express
const express = require("express");
//Starting the Express Router
const router = express.Router();
//Requiring the Restaurant model
const Restaurant = require("../models/restaurant");

router.get("/", async (req, res) => {
  const restaurant = await Restaurant.find({});
  res.send("/restaurants/index", { restaurant });
});

module.exports = router;
