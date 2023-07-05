const mongoose = require("mongoose");
const { ratingSchema } = require("./rating");

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  images: [
    {
      type: String,
      required: true,
    },
  ],
  quantity: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  priceUnit: {
    type: String,
    required: true,
    enum: ["lb", "oz"],
  },
  // ONE category has MANY products
  category: { type: mongoose.Types.ObjectId, ref: "Category" },
  // ONE farm has MANY products
  farm: { type: mongoose.Types.ObjectId, ref: "Farm" },
  traits: [
    {
      type: String,
      required: true,
      enum: ["Organic", "In Season", "End of Season", "Ripened"],
    },
  ],
  ratings: [ratingSchema],
});

const Product = mongoose.model("Product", productSchema);

module.exports = { Product, productSchema };
