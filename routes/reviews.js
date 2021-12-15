const express = require("express");
const router = express.Router({ mergeParams: true });
const reviews = require("../public/javascripts/controllers/reviews");
const {
  isLoggedIn,
  validateReview,
  isReviewAuthor,
} = require("../public/javascripts/utilities/middleware");
const catchAsync = require("../public/javascripts/utilities/catchAsync");

router.post("/", isLoggedIn, validateReview, catchAsync(reviews.createReview));

router.delete(
  "/:reviewId",
  isLoggedIn,
  isReviewAuthor,
  catchAsync(reviews.deleteReview)
);

module.exports = router;
