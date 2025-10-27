const Product = require("../models/product.model");

exports.createProduct = async(req, res) => {
  try {
    const product= new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch(err) {
    res.status(400).json({ error: err.message });
  }
};
exports.getAllProducts = async (req, res) => {
  const products = await Product.find();
  res.json(products);
};
