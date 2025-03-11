import express from "express";
import mongoose from "mongoose";
const cors = require("cors");
require("dotenv").config(); // Load environment variables from .env file

import TaskRouter from "./routes/taskRoutes"; // Your task router import

const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json()); // For parsing application/json

app.use(
  cors({
    origin: ["http://localhost:5173"], 
    credentials: true, // Allow credentials (cookies, auth headers, etc.)
  })
);
// Middleware and routes
app.use(express.json());
app.use("/tasks", TaskRouter);


// MongoDB connection
const mongoUri = process.env.MONGO_URI; // Use the MONGO_URI from the .env file
if (!mongoUri) {
  console.error("MongoDB URI not found in .env file.");
  process.exit(1); // Exit if MONGO_URI is not found
}

// MongoDB connection
mongoose
  .connect(mongoUri)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Export the server to stop it in tests
export { server };
