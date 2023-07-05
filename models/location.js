const mongoose = require("mongoose");

const locationSchema = mongoose.Schema({
  streetAddress: {
    type: String,
    required: true,
  },
  aptNo: {
    type: String,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  zipcode: {
    type: String,
    required: true,
  },
});

const Location = mongoose.model("Location", locationSchema);

module.expors = { Location, locationSchema };
