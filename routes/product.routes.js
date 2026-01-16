const express = require("express");
const router = express.Router();
const Product = require("../models/product.model");
// Add Product
router.post("/", async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
// Get All Products (WITH QUERY)
router.get("/", async (req, res) => {
  try {
    const {
      search,
      category,
      minPrice,
      maxPrice,
      sort,
      page = 1,
      limit = 10
    } = req.query;

    const query = {};

    if (search) query.name = { $regex: search, $options: "i" };
    if (category) query.category = category;
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    let sortOption = {};
    if (sort === "latest") sortOption = { createdAt: -1 };
    if (sort === "priceLow") sortOption = { price: 1 };
    if (sort === "priceHigh") sortOption = { price: -1 };
    if (sort === "rating") sortOption = { rating: -1 };

    const pageNumber = Number(page) || 1;
    const limitNumber = Number(limit) || 10;
    const skip = (pageNumber - 1) * limitNumber;

    const products = await Product.find(query)
      .sort(sortOption)
      .skip(skip)
      .limit(limitNumber);

    const total = await Product.countDocuments(query);

    res.json({
      total,
      page: pageNumber,
      pages: Math.ceil(total / limitNumber),
      products
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// Get Single Product by ID
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product)
      return res.status(404).json({ message: "Product not found" });

    res.json(product);
  } catch (err) {
    if (err.name === "CastError")
      return res.status(400).json({ message: "Invalid product ID" });
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
