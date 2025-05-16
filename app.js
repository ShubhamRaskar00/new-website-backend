// --- START OF FILE app.js ---

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const ErrorHandler = require("./middleware/error"); // Assuming this is the path to your main error handler middleware
const customErrorHandlerClass = require("./utils/ErrorHandler"); // Path to your ErrorHandler class

// Load environment variables (only in development/testing)
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({
    path: ".env", // Ensure this path is correct relative to where you run node
  });
}

const app = express();

// List of allowed origins
const allowedOrigins = [
  "https://shubhamraskar.vercel.app",
  "https://shubhamraskar00.github.io",
  "http://microvision.whf.bz"
];

const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl requests) OR if origin is in the list
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.warn(`CORS blocked origin: ${origin}`); // Log blocked origins
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true, // Allow cookies/authorization headers
};

// --- Middleware Order ---

// 1. CORS - Apply CORS middleware early
app.use(cors(corsOptions));

// 2. Cookie Parser
app.use(cookieParser());

// 3. Body Parsers (Modern Express)
// Use express built-in parsers instead of 'body-parser' package
app.use(express.json({ limit: "50mb" })); // For parsing application/json
app.use(express.urlencoded({ extended: true, limit: "50mb" })); // For parsing application/x-www-form-urlencoded

// --- Routes ---
const contactRoutes = require("./controller/contact"); // Use a more descriptive variable name
app.use("/api/contact", contactRoutes); // Mount the contact routes

// --- Root/Health Check Route (Optional but Recommended) ---
app.get("/", (req, res) => {
  res.status(200).json({ status: "UP", message: "Server is running" });
});

// --- Not Found Handler (Optional) ---
// Catch requests to routes that don't exist
app.use((req, res, next) => {
  // Use your custom ErrorHandler class here
  next(new customErrorHandlerClass(`Route not found: ${req.originalUrl}`, 404));
});

// --- Global Error Handler ---
// This MUST be the LAST middleware
app.use(ErrorHandler); // Use the error handling middleware from middleware/error.js

module.exports = app;
// --- END OF FILE app.js ---
