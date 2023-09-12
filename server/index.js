import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

// Get the routes
import postsRoutes from "./routes/posts.js";
import userRoutes from "./routes/users.js";

import { config } from "./config/config.js";

const app = express();

// Properly send POST requests
app.use(
    cors({
        origin: [config.clientURL, config.mobileClient],
        credentials: true,
    })
);

// Content-Type - application/json
app.use(express.json({ limit: "30mb", extended: true }));
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ limit: "30mb", extended: true }));

// Parse Cookie
app.use(cookieParser());

// Middlewares
// Using express middleware to connect the route to our app - Always use after cors
app.use("/posts", postsRoutes); // localhost:5000/posts -> routes/posts.js
// Using express middleware to connect the route to our app
app.use("/user", userRoutes); // localhost:5000/user => routes/users.js

// Backend is hosted at(API)
app.get("/", (_, res) => {
    res.send("Welcome to FilmOpus API!!");
});

const PORT = config.port || 5000;
const db = config.mongoURL;

// connect to database
const connectDB = async () => {
    try {
        await mongoose
            .connect(db, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            })
            .then(() =>
                app.listen(PORT, () => {
                    console.log(
                        `Server Running on Port: http://localhost:${PORT}`
                    );
                })
            )
            .catch((error) => console.log(`${error} did not connect`));
    } catch (error) {
        console.error(`Error1: ${error}`);
        process.exit(1);
    }
};

connectDB();
