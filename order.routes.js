const express = require("express");
const router = express.Router();
const Order = require("../models/order.model");
const Product = require("../models/product.model");

router.post("/", async (req, res) => {
  try {
    const { user, products } = req.body;
    if (!products || products.length === 0) {
    return res.status(400).json({ message: "No products in order" });
    }
    let total = 0;
    for (let item of products) {
      const prod = await Product.findById(item.product);
      if (!prod) {
        return res.status(404).json({ message:`Product not found: ${item.product}` });
      }
      total += prod.price * item.quantity;
    }
    const order = new Order({
      user,
      products,
      totalPrice: total
    });
    await order.save();
    res.status(201).json(order);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get("/", async(req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .populate("products.product","name price");
    res.json(orders);
  } catch (err) {
    res.status(500).json({error: err.message });
  }
});

module.exports = router;
