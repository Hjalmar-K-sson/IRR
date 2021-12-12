const Restaurant = require("../models/restaurant");
const Review = require("../models/review");

module.exports.createReview = async () => {
  const restaurant = await Restaurant.findById(req.params.id);
  const review = new Review(req.body.review);
  review.author = req.user.id;
  restaurant.reviews.push(review);
  await review.save();
  await restaurant.save();
  req.flash("success", "Thanks for Your review!");
  res.redirect(`/restaurant/${restaurant.id}`);
};
