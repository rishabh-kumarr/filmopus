import express from "express";
import cors from "cors";
import dotenv from "dotenv";

// Get the routes
import postsRoutes from "./routes/posts.js";
import userRoutes from "./routes/users.js";

import connectDB from "./config/db.js";
import { config } from "./config/config.js";

dotenv.config();
const app = express();

// Middlewares
app.use(cors());

// Content-Type - application/json
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));

// Routes
app.use("/posts", postsRoutes);
app.use("/user", userRoutes);

// Backend is hosted at(API)
app.get("/", (_, res) => {
    res.send("Welcome to FilmOpus API!!");
});

const PORT = config.port || 5000;

// connect to database
const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("❌ Server failed to start:", err);
    process.exit(1);
  }
};

startServer();
