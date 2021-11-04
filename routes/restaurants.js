const express = require("express");
const router = express.Router();
const Restaurant = require("../models/restaurant");

router.get("/", async (req, res) => {
  const restaurant = await Restaurant.find({});
  res.send("/restaurants/index", { restaurant });
});

module.exports = router;
