const Restaurant = require("../models/restaurant");
const Review = require("../models/review");

module.exports.createReview = async (req, res) => {
  const restaurant = await Restaurant.findById(req.params.id);
  const review = new Review(req.body.review);
  review.author = req.user.id;
  restaurant.reviews.push(review);
  await review.save();
  await restaurant.save();
  // console.log(review);
  req.flash("success", "Review added!");
  res.redirect(`/restaurants/${restaurant.id}`);
};

module.exports.deleteReview = async (req, res) => {
  const { id, reviewId } = req.params;
  const restaurant = await Restaurant.findByIdAndUpdate(
    id,
    { $pull: { reviews: reviewId } },
    { useFindAndModify: false }
  );
  const review = await Review.findByIdAndDelete(reviewId, {
    useFindAndModify: false,
  });
  req.flash("alert", "Review deleted!");
  res.redirect(`/restaurants/${restaurant.id}`);
};
