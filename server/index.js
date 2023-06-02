// Using Node.js `require()`
// To use import like react, Make sure to use the "type": "module" configuration in your package.json file
import express from "express"; // const express = require("express");
import dotenv from "dotenv"; // const dotenv = require("dotenv");
import mongoose from "mongoose"; // const mongoose = require("mongoose");
import morgan from "morgan";
import authRoute from "./routes/auth.js";
import categoryRoutes from "./routes/category.js";
import productRoutes from "./routes/product.js";
import cors from "cors";

const app = express();
dotenv.config();

// Environmental Variables
const port = process.env.PORT || 8000;
const url = process.env.DATABASE_URL;

// Connect to MongoDB using mongoose
await mongoose
  .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB successfully");
    // Perform database operations here
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

// Use Morgan middleware
app.use(cors()); // Enable CORS for all routes
app.use(morgan("dev"));
app.use(express.json());

// Middleware function is used with `app.use()`
app.use("/api", authRoute);
app.use("/api", categoryRoutes);
app.use("/api", productRoutes);

// Start the server
app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
