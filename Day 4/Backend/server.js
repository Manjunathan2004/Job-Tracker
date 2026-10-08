require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const internshipRoutes = require("./routes/internshipRoutes");

const app = express();

const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Internship Routes
app.use("/api/internships", internshipRoutes);

// Test Route
app.get("/", (req, res) => {
  res.json({
    message: "Internship Tracker API is running"
  });
});

// Connect MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected successfully");

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error.message);
  });