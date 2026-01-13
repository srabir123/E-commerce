const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
<<<<<<< HEAD

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

//Register User
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
=======
const protect = require("../middlewares/authMiddleware");
const admin = require("../middlewares/adminMiddleware");

const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

// Register
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

>>>>>>> 1752f7d (updated backend code)
  try {
    const userExists = await User.findOne({ email });
    if (userExists)
      return res.status(400).json({ message: "User already exists" });

    const user = await User.create({ name, email, password });
<<<<<<< HEAD
=======

>>>>>>> 1752f7d (updated backend code)
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
<<<<<<< HEAD
      token: generateToken(user._id),
=======
      token: generateToken(user._id, user.role),
>>>>>>> 1752f7d (updated backend code)
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

<<<<<<< HEAD
//Login User
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
=======
// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

>>>>>>> 1752f7d (updated backend code)
    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
<<<<<<< HEAD
        token: generateToken(user._id),
=======
        token: generateToken(user._id, user.role),
>>>>>>> 1752f7d (updated backend code)
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

<<<<<<< HEAD
// Get All Users
router.get("/", async (req, res) => {
  const users = await User.find();
=======
// Get All Users (ADMIN ONLY)
router.get("/", protect, admin, async (req, res) => {
  const users = await User.find().select("-password");
>>>>>>> 1752f7d (updated backend code)
  res.json(users);
});

module.exports = router;
