const mongoose = require("mongoose");
const { ratingSchema } = require("./rating");
const { locationSchema } = require("./location");

const farmSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  values: [
    {
      type: String,
      required: true,
      enum: [
        "Sustainable Water Usage",
        "Organic",
        "Family-Owned",
        "Zero Waste",
        "Plastic-Free Packaging",
        "Carbon Neutral",
      ],
    },
  ],
  email: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  location: locationSchema,
  ratings: [ratingSchema],
});

const Farm = mongoose.model("Farm", farmSchema);

module.exports = { Farm };
