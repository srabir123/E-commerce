const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const userRoutes = require("./routes/user.routes");
const productRoutes = require("./routes/product.routes");
const orderRoutes = require("./routes/order.routes");

const app = express();
app.use(bodyParser.json());

mongoose
  .connect("mongodb://127.0.0.1:27017/ecommerce", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) =>console.log("MongoDB connection error:", err));

app.use("/users", userRoutes);
app.use("/products", productRoutes);
app.use("/orders",  orderRoutes);

app.get("/",(req, res) => res.send("E-commerce Backend is running"));

const PORT = 5000;
app.listen(PORT,() => console.log(`Server running on port ${PORT}`));
