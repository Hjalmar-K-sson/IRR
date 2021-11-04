const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RestaurantSchema = new Schema({
  name: String,
  location: String,
  description: String,
  priceRange: String,
  cuisine: String,
  courses: [String],
  geometry: {
    type: {
      type: String,
      enum: ["Point"],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
  images: [
    {
      url: String,
      filename: String,
    },
  ],
});

module.exports = mongoose.model("Restaurant", RestaurantSchema);
