const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  countInStock: { type: Number, default: 0 },
});

module.exports = mongoose.model("Product", productSchema);
