const Joi = require("joi");

module.exports.restaurantSchema = Joi.object({
  restaurant: Joi.object({
    name: Joi.string().required(),
    address: {
      city: Joi.string().required(),
      state_region: Joi.string().allow(null, ""),
      country: Joi.string().required(),
      street: Joi.string().required(),
      houseNumber: Joi.string(),
      zipCode: Joi.string(),
    },
    description: Joi.string().required(),
    priceRange: Joi.string().required(),
    cuisine: Joi.string().required(),
    courses: {
      courseName: Joi.string(),
      courseImgs: {
        filename: Joi.string(),
        url: Joi.string(),
      },
    },
    images: Joi.object({
      filename: Joi.string(),
      url: Joi.string(),
    }),
  }).required(),
  deleteImages: Joi.array(),
});

module.exports.reviewSchema = Joi.object({
  review: Joi.object({
    rating: Joi.number().required().min(1).max(5),
    body: Joi.string().required(),
  }).required(),
});
