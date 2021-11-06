//Requiring mongoose
const mongoose = require("mongoose");
//Defining the mongoose schema as a constant
const Schema = mongoose.Schema;

//Creating a new mongoose Schema for Restaurant objects
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

//Exporting the Restaurant model
module.exports = mongoose.model("Restaurant", RestaurantSchema);
