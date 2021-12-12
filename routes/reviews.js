const express = require("express");
const router = express.Router();
const reviews = require("../public/javascripts/controllers/reviews");
const {
  isLoggedIn,
  validateReview,
} = require("../public/javascripts/utilities/middleware");
const catchAsync = require("../public/javascripts/utilities/catchAsync");

router
  .route("/")
  .post(isLoggedIn, validateReview, catchAsync(reviews.createReview));
