<<<<<<< HEAD
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: { type: String,required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required:true },
  isAdmin: { type: Boolean, default: false },
});

userSchema.pre("save", async function(next) {
  if(!this.isModified("password")) return next();
=======
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user'
    }
  },
  { timestamps: true }
);

// 🔐 Password hash before save
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }

>>>>>>> 1752f7d (updated backend code)
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});
<<<<<<< HEAD
userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};
module.exports = mongoose.model("User", userSchema);
=======

// 🔑 Match password method
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
>>>>>>> 1752f7d (updated backend code)
