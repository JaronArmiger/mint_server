const jwt = require("jsonwebtoken");
require("dotenv").config();

const PUBLIC_KEY_SECRET = process.env.PUBLIC_KEY_SECRET;

const auth = async (req, res, next) => {
  try {
    const token = req.header("x-auth-token");
    if (!token) {
      return res
        .status(401)
        .json({ msg: "No auth token provided. Access denied." });
    }

    const verified = jwt.verify(token, PUBLIC_KEY_SECRET);

    if (!verified) {
      return res
        .status(401)
        .json({ msg: "Token verification failed. Access denied" });
    }

    req.userId = verified.userId;
    req.token = token;
    next();
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

module.exports = auth;
