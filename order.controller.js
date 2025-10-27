const Order= require("../models/order.model");
const Product =require("../models/product.model");

exports.createOrder = async(req,res) => {
  try {
    const order= new Order(req.body);
    let total = 0;
    for (let item of order.products) {
      const prod =await Product.findById(item.product);
      total += prod.price * item.quantity;
    }
    order.totalPrice = total;
    await order.save();
    res.status(201).json(order);
  } catch(err) {
    res.status(400).json({ error: err.message });
  }
};
exports.getAllOrders = async(req,res) => {
  const orders = await Order.find().populate("user").populate("products.product");
  res.json(orders);
};
