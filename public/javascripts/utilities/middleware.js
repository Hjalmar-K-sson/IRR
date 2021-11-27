const Restaurant = require("../models/restaurant");
const ExpressError = require("./ExpressError");
const { restaurantSchema, reviewSchema } = require("./joiSchemas");

module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.returnTo = req.originalUrl;
    req.flash("error", "Please sign in!");
    return res.redirect("/login");
  }
  next();
};

module.exports.isAuthor = async (req, res, next) => {
  const { id } = req.params;
  const restaurant = await Restaurant.findById(id);
  if (!restaurant.author.equals(req.user.id)) {
    req.flash("error", "You are not authorized to do this!");
    return res.redirect(`/restaurants/${id}`);
  }
  next();
};

module.exports.validateRestaurant = (req, res, next) => {
  console.log(req.body);
  const { error } = restaurantSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};
