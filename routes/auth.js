const express = require("express");
const User = require("../models/user");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const authRouter = express.Router();
const auth = require("../middleware/auth");

// sign up
authRouter.post("/api/auth/signup", async (req, res) => {
  try {
    const { firstName, lastName, email, phoneNumber, password } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res
        .status(400)
        .json({ msg: "User with this email already exists." });
    }

    const hashedPassword = await bcryptjs.hash(password, 8);

    let user = new User({ firstName, lastName, email, phoneNumber, password });
    user = await user.save();
    res.json(user);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});
