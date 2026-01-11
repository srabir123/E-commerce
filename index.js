<<<<<<< HEAD
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");

// Import Routes
const userRoutes = require("./routes/user.routes");
const productRoutes = require("./routes/product.routes");
const orderRoutes = require("./routes/order.routes");
const cartRoutes = require("./routes/cart.routes");

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(morgan("dev"));

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log(" MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/cart", cartRoutes);

// Default Route
app.get("/", (req, res) => {
  res.send("E-commerce API is running successfully!");
});

// Error Handler
app.use((err, req, res, next) => {
  console.error("Error:", err.stack);
  res.status(500).json({ message: err.message });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(` Server running at http://localhost:${PORT}`)
);
=======
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");

// Import Routes
const userRoutes = require("./routes/user.routes");
const productRoutes = require("./routes/product.routes");
const orderRoutes = require("./routes/order.routes");
const cartRoutes = require("./routes/cart.routes");

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(morgan("dev"));

// MongoDB Connection

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log(" MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/cart", cartRoutes);

// Default Route
app.get("/", (req, res) => {
  res.send("E-commerce API is running successfully!");
});

// Error Handler
app.use((err, req, res, next) => {
  console.error("Error:", err.stack);
  res.status(500).json({ message: err.message });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(` Server running at http://localhost:${PORT}`)
);
>>>>>>> 1752f7d (updated backend code)
