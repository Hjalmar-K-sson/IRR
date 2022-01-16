const mapbox = require("../utilities/mapbox");
const { cloudinary } = require("../utilities/cloudinary");
const Restaurant = require("../models/restaurant");
const { authorize } = require("passport");

module.exports.index = async (req, res) => {
  const restaurants = await Restaurant.find({});
  res.render("./restaurants/index", { restaurants });
};

module.exports.showRestaurant = async (req, res) => {
  const restaurant = await Restaurant.findById(req.params.id)
    .populate({
      path: "reviews",
      populate: {
        path: "author",
      },
    })
    .populate("author");
  if (!restaurant) {
    req.flash("error", "Sorry, this restautant does not exist :(");
    return res.redirect("/restaurants");
  }
  res.render("./restaurants/show", { restaurant });
};

module.exports.renderNewForm = (req, res) => {
  res.render("./restaurants/new");
};

module.exports.renderEditForm = async (req, res) => {
  const { id } = req.params;
  const restaurant = await Restaurant.findById(id);
  if (!restaurant) {
    req.flash("error", "This restaurant does not exist!");
    return res.redirect("/restaurants");
  }
  res.render("./restaurants/edit", { restaurant });
};

module.exports.createRestaurant = async (req, res) => {
  const geoData = await mapbox.geocoder
    .forwardGeocode({
      query: `${req.body.restaurant.address.street} ${req.body.restaurant.address.houseNumber}, ${req.body.restaurant.address.city}`,
      limit: 1,
    })
    .send();
  const newRestaurant = new Restaurant(req.body.restaurant);
  newRestaurant.geometry = geoData.body.features[0].geometry;
  newRestaurant.images = req.files.map((f) => ({
    filename: f.filename,
    url: f.path,
  }));
  newRestaurant.author = req.user.id;
  await newRestaurant.save();
  req.flash("success", "Restaurant Added!");
  res.redirect(`/restaurants/${newRestaurant.id}`);
};

module.exports.deleteRestaurant = async (req, res) => {
  const { id } = req.params;
  await Restaurant.findByIdAndDelete(id);
  req.flash("alert", "Restaurant deleted!");
  res.redirect("/restaurants");
};

module.exports.updateRestaurant = async (req, res) => {
  const { id } = req.params;
  const geoData = await mapbox.geocoder
    .forwardGeocode({
      query: `${req.body.restaurant.address.street}, ${req.body.restaurant.address.city}`,
      limit: 1,
    })
    .send();
  const restaurant = await Restaurant.findByIdAndUpdate(
    id,
    {
      ...req.body.restaurant,
    },
    { runValidators: true, new: true, useFindAndModify: false }
  );
  restaurant.address.geometry = geoData.body.features[0].geometry;
  const imgs = req.files.map((f) => ({ url: f.path, filename: f.filename }));
  if (restaurant.images) {
    restaurant.images.push(...imgs);
  }
  await restaurant.save();
  if (req.body.deleteImages) {
    for (let filename of req.body.deleteImages) {
      await cloudinary.uploader.destroy(filename);
    }
    await restaurant.updateOne({
      $pull: { images: { filename: { $in: req.body.deleteImages } } },
    });
  }
  req.flash("success", "Restaurant successfully updated!");
  res.redirect(`/restaurants/${id}`);
};
