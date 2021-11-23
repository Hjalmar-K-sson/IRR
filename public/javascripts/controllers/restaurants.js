const mapbox = require("../utilities/mapbox");
const { cloudinary } = require("../utilities/cloudinary");
const Restaurant = require("../models/restaurant");
const { authorize } = require("passport");

module.exports.index = async (req, res) => {
  const restaurants = await Restaurant.find({});
  // console.log(restaurants);
  res.render("./restaurants/index", { restaurants });
};

module.exports.showRestaurant = async (req, res) => {
  const restaurant = await Restaurant.findById(req.params.id).populate({
    path: "reviews",
    populate: {
      path: "author",
    },
  });
  if (!restaurant) {
    req.flash("error", "Sorry, this restautant does not exist :(");
    return res.redirect("/restaurants");
  }
  res.render("./restaurants/show", { restaurant });
};

module.exports.renderNewForm = (req, res) => {
  res.render("./restaurants/new");
};

module.exports.createRestaurant = async (req, res) => {
  const geoData = await mapbox.geocoder
    .forwardGeocode({
      query: req.body.restaurant.address,
      limit: 1,
    })
    .send();
  const newRestaurant = new Restaurant(req.body.restaurant);
  newRestaurant.address.geometry = geoData.body.features[0].geometry;
  newRestaurant.images = req.files.map((f) => ({
    filename: f.filename,
    url: f.url,
  }));
  newRestaurant.author = req.user.id;
  await newRestaurant.save();
  req.flash("success", "Restaurant Added!");
  res.redirect(`/restaurants/${newRestaurant.id}`);
};
