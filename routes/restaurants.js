//Requiring Express
const express = require("express");
//Starting the Express Router
const router = express.Router();
//Requiring the Restaurant model
const Restaurant = require("../public/javascripts/models/restaurant");
//Requiring Restaurant controllers
const restaurants = require("../public/javascripts/controllers/restaurants");
//Requiring async error catching middleware
const catchAsync = require("../public/javascripts/utilities/catchAsync");

router.route("/").get(catchAsync(restaurants.index));

router.route("/:id").get(catchAsync(restaurants.showRestaurant));

module.exports = router;
