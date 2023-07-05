const express = require("express");

const { Farm } = require("../models/farm");
const { Location } = require("../models/location");
const farmRouter = express.Router();

farmRouter.post("/api/farm/create", async (req, res) => {
  try {
    const { name, values, email, phoneNumber, location } = req.body;

    // const { streetAddress, aptNo, city, state, zipcode } = location;

    // let newLocation = new Location(location);

    // newLocation = await newLocation.save();

    let farm = new Farm({
      name,
      values,
      email,
      phoneNumber,
      location,
    });

    farm = await farm.save();
    res.json(farm);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = farmRouter;
