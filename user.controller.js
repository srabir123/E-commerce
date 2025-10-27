const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

const generateToken= (id) => jwt.sign({ id }, process.env.JWT_SECRET,{ expiresIn:"30d"});

exports.registerUser = async (req,res) =>{
  const { name,email, password } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if(userExists) return res.status(400).json({ message:"User already exists" });

    const user =await User.create({ name, email, password });
    res.status(201).json({
      _id: user._id,
      name:user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } catch(err) {
    res.status(400).json({ error: err.message });
  }
};

exports.loginUser = async(req, res) => {
  const { email, password} = req.body;
  try {
    const user =await User.findOne({ email });
    if(user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch(err){
    res.status(500).json({ error: err.message });
  }
};

exports.getAllUsers = async(req, res) => {
  const users= await User.find();
  res.json(users);
};
