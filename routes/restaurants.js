//Requiring Express
const express = require("express");
//Starting the Express Router
const router = express.Router();
//Requiring Restaurant controllers
const restaurants = require("../public/javascripts/controllers/restaurants");
//Requiring async error catching middleware
const catchAsync = require("../public/javascripts/utilities/catchAsync");
// Requiring file with other express middleware
const {
  isLoggedIn,
  isAuthor,
  validateRestaurant,
} = require("../public/javascripts/utilities/middleware");
//Requiring cloudinary storage config file
const {
  cloudinary,
  storage,
  upload,
} = require("../public/javascripts/utilities/cloudinary");
const restaurant = require("../public/javascripts/models/restaurant");

router
  .route("/")
  .get(catchAsync(restaurants.index))
  .post(
    isLoggedIn,
    upload.array("restaurant[images]"),
    validateRestaurant,
    catchAsync(restaurants.createRestaurant)
  );

router.route("/new").get(isLoggedIn, restaurants.renderNewForm);

router
  .route("/:id")
  .get(catchAsync(restaurants.showRestaurant))
  .delete(isLoggedIn, catchAsync(restaurants.deleteRestaurant))
  .put(isLoggedIn, isAuthor);

router
  .route("/:id/edit")
  .get(isLoggedIn, isAuthor, catchAsync(restaurants.renderEditForm));

module.exports = router;
