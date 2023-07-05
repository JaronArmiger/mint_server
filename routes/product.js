const express = require("express");
const { Product } = require("../models/product");

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