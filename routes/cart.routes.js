<<<<<<< HEAD
const express = require("express");
const router = express.Router();
const Cart = require("../models/cart.model");
const Product = require("../models/product.model");

// Get all carts (admin only later)
router.get("/", async (req, res) => {
  try {
    const carts = await Cart.find().populate("products.productId");
    res.json(carts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get single user's cart
router.get("/:userId", async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId }).populate("products.productId");
    if (!cart) return res.status(404).json({ message: "Cart not found" });
    res.json(cart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add product to cart
router.post("/", async (req, res) => {
  const { userId, productId, quantity } = req.body;

  try {
    let cart = await Cart.findOne({ userId });

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    if (!cart) {
      // create new cart
      cart = new Cart({
        userId,
        products: [{ productId, quantity }],
        totalPrice: product.price * quantity,
      });
    } else {
      // check if product already exists in cart
      const existingProduct = cart.products.find(
        (item) => item.productId.toString() === productId
      );

      if (existingProduct) {
        existingProduct.quantity += quantity;
      } else {
        cart.products.push({ productId, quantity });
      }

      cart.totalPrice += product.price * quantity;
    }

    const updatedCart = await cart.save();
    res.status(201).json(updatedCart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Remove product from cart
router.delete("/:userId/:productId", async (req, res) => {
  try {
    const { userId, productId } = req.params;
    const cart = await Cart.findOne({ userId }).populate("products.productId");

    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const productIndex = cart.products.findIndex(
      (item) => item.productId._id.toString() === productId
    );

    if (productIndex === -1)
      return res.status(404).json({ message: "Product not found in cart" });

    const productPrice = cart.products[productIndex].productId.price;
    const productQty = cart.products[productIndex].quantity;

    cart.totalPrice -= productPrice * productQty;
    cart.products.splice(productIndex, 1);

    await cart.save();
    res.json(cart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Clear entire cart
router.delete("/:userId", async (req, res) => {
  try {
    const cart = await Cart.findOneAndDelete({ userId: req.params.userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });
    res.json({ message: "Cart cleared successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
=======
const express = require("express");
const router = express.Router();
const Cart = require("../models/cart.model");
const Product = require("../models/product.model");

// Get all carts (admin only later)
router.get("/", async (req, res) => {
  try {
    const carts = await Cart.find().populate("products.productId");
    res.json(carts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get single user's cart
router.get("/:userId", async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId }).populate("products.productId");
    if (!cart) return res.status(404).json({ message: "Cart not found" });
    res.json(cart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add product to cart
router.post("/", async (req, res) => {
  const { userId, productId, quantity } = req.body;

  try {
    let cart = await Cart.findOne({ userId });

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    if (!cart) {
      // create new cart
      cart = new Cart({
        userId,
        products: [{ productId, quantity }],
        totalPrice: product.price * quantity,
      });
    } else {
      // check if product already exists in cart
      const existingProduct = cart.products.find(
        (item) => item.productId.toString() === productId
      );

      if (existingProduct) {
        existingProduct.quantity += quantity;
      } else {
        cart.products.push({ productId, quantity });
      }

      cart.totalPrice += product.price * quantity;
    }

    const updatedCart = await cart.save();
    res.status(201).json(updatedCart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Remove product from cart
router.delete("/:userId/:productId", async (req, res) => {
  try {
    const { userId, productId } = req.params;
    const cart = await Cart.findOne({ userId }).populate("products.productId");

    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const productIndex = cart.products.findIndex(
      (item) => item.productId._id.toString() === productId
    );

    if (productIndex === -1)
      return res.status(404).json({ message: "Product not found in cart" });

    const productPrice = cart.products[productIndex].productId.price;
    const productQty = cart.products[productIndex].quantity;

    cart.totalPrice -= productPrice * productQty;
    cart.products.splice(productIndex, 1);

    await cart.save();
    res.json(cart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Clear entire cart
router.delete("/:userId", async (req, res) => {
  try {
    const cart = await Cart.findOneAndDelete({ userId: req.params.userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });
    res.json({ message: "Cart cleared successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
>>>>>>> 1752f7d (updated backend code)
