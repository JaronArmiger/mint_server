const express = require("express");
const { Product } = require("../models/product");
const { Category } = require("../models/category");

const productRouter = express.Router();

productRouter.get("/api/product/find-by-id/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    res.json(product);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

productRouter.post("/api/product/create", async (req, res) => {
  try {
    const {
      name,
      description,
      images,
      quantity,
      price,
      priceUnit,
      category,
      farm,
      traits,
    } = req.body;

    let product = new Product({
      name,
      description,
      images,
      quantity,
      price,
      priceUnit,
      category,
      farm,
      traits,
    });

    product = await product.save();
    res.json(product);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = productRouter;
