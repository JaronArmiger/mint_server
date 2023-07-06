const express = require("express");
const { Product } = require("../models/product");
const { Category } = require("../models/category");

const categoryRouter = express.Router();

categoryRouter.get(
  "/api/category/products-by-category/:categoryId",
  async (req, res) => {
    try {
      const { categoryId } = req.params;
      const category = await Category.findById(categoryId);
      const products = await Product.find({ category });

      res.json(products);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }
);

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
