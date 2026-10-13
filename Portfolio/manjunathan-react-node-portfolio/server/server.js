const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: process.env.CLIENT_ORIGIN || "http://localhost:5173" }));
app.use(express.json({ limit: "20kb" }));

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", message: "Portfolio API is running" });
});

app.post("/api/contact", (req, res) => {
  const { name, email, message } = req.body || {};
  if (
    typeof name !== "string" || name.trim().length < 2 ||
    typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
    typeof message !== "string" || message.trim().length < 5
  ) {
    return res.status(400).json({
      message: "Please provide a valid name, email address, and message."
    });
  }

  // Demo behavior: logs messages to the server terminal. Add a database or email service for production.
  console.log("\n--- Portfolio contact message ---");
  console.log("Name:", name.trim());
  console.log("Email:", email.trim());
  console.log("Message:", message.trim());
  console.log("---------------------------------\n");

  return res.status(201).json({
    message: "Message received successfully.",
    received: true
  });
});

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ message: "Unexpected server error." });
});

app.listen(PORT, () => {
  console.log(`Portfolio API is running at http://localhost:${PORT}`);
});