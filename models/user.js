const mongoose = require("mongoose");

const { locationSchema } = require("./location");
const { productSchema } = require("./product");

const userSchema = mongoose.Schema({
  name: {
    required: true,
    type: String,
    trim: true,
  },
  email: {
    required: true,
    type: String,
    trim: true,
    validate: {
      validator: (value) => {
        const re =
          /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        return value.match(re);
      },
      message: "Please enter a valid email address",
    },
  },
  validate: {
    validator: (value) => {
      return value.length > 6;
    },
    message: "Password must be longer than 6 characters",
  },
  address: locationSchema,
  role: {
    type: String,
    default: "user",
    enum: ["user", "farm", "admin"],
  },
  cart: [
    {
      productSchema,
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
});

const User = mongoose.model("User", userSchema);

module.exports = { User, userSchema };
