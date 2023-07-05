const express = require("express");
const { Category } = require("../models/category");

const categoryRouter = express.Router();

categoryRouter.post("/api/category/create", async (req, res) => {
  try {
    const { name, image } = req.body;

    let category = new Category({
      name,
      image,
    });

    category = await category.save();
    res.json(category);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = categoryRouter;
