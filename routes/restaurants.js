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
// Requiring file with other express middleware
const { isLoggedIn } = require("../public/javascripts/utilities/middleware");
//Requiring cloudinary storage config file
const {
  cloudinary,
  storage,
  upload,
} = require("../public/javascripts/utilities/cloudinary");

router
  .route("/")
  .get(catchAsync(restaurants.index))
  .post(
    isLoggedIn,
    upload.array("image"),
    catchAsync(restaurants.createRestaurant)
  );

router.route("/new").get(restaurants.renderNewForm);

router.route("/:id").get(catchAsync(restaurants.showRestaurant));

module.exports = router;
