//Requiring mongoose
const mongoose = require("mongoose");
//Requiring user & review schemas
const User = require("./user");
const Review = require("./review");
//Defining the mongoose schema as a constant
const Schema = mongoose.Schema;
//Creating a partial Schema for images
const ImageSchema = new Schema({
  filename: String,
  url: String,
});
ImageSchema.virtual("thumbnail").get(function () {
  return this.url.replace("/upload", "/upload/w_200");
});
//Creating a partial Schema for addresses
const RestaurantAddressSchema = new Schema({
  city: String,
  state_region: String,
  country: String,
  street: String,
  houseNumber: String,
  zipCode: String,
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
});
//Creating a partial Schema for restaurant courses
const RestaurantCourseSchema = new Schema({
  courseName: String,
  courseImgs: [ImageSchema],
});

//Creating a new mongoose Schema for Restaurant objects
const schemaOpts = {
  toJSON: { virtuals: true },
};
const RestaurantSchema = new Schema(
  {
    name: String,
    address: RestaurantAddressSchema,
    description: String,
    priceRange: String,
    cuisine: String,
    courses: [RestaurantCourseSchema],
    images: [ImageSchema],
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    reviews: [
      {
        type: Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
  },
  schemaOpts
);

//Exporting the Restaurant model
module.exports = mongoose.model("Restaurant", RestaurantSchema);
