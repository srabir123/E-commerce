const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref:"User", required: true },
  products: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref:"Product" },
      quantity: { type: Number, default: 1},
    },
  ],
  totalPrice: Number,
  status: { type: String,default: "Pending"},
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Order",orderSchema);
