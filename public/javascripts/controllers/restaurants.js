const mapbox = require("../utilities/mapbox");
const { cloudinary } = require("../utilities/cloudinary");
const Restaurant = require("../models/restaurant");

module.exports.index = async (req, res) => {
  const restaurants = await Restaurant.find({});
  // console.log(restaurants);
  res.render("./restaurants/index", { restaurants });
};
