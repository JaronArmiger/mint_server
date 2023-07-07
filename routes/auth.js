const express = require("express");
const { User } = require("../models/user");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const authRouter = express.Router();
const auth = require("../middleware/auth");

const PUBLIC_KEY_SECRET = process.env.PUBLIC_KEY_SECRET;

// sign up
authRouter.post("/api/auth/signup", async (req, res) => {
  try {
    console.log("/api/auth/signup");
    const { firstName, lastName, email, phoneNumber, password } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res
        .status(400)
        .json({ msg: "A user with this email already exists." });
    }

    const hashedPassword = await bcryptjs.hash(password, 8);

    let user = new User({ firstName, lastName, email, phoneNumber, password });
    user = await user.save();
    res.json(user);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

authRouter.post("/api/auth/signin", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      res.status(400).json({ msg: "User with this email does not exist!" });
    }

    const isMatch = await bcryptjs.compare(password, user.password);

    if (!isMatch) {
      res.status(400).json({ msg: "Incorrect password" });
    }

    const token = jwt.sign({ id: user._id }, PUBLIC_KEY_SECRET);
    res.json({ token, ...user._doc });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = authRouter;
