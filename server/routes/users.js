import express from "express";

// Get the controllers
import { signin, signup } from "../controllers/users.js";

// Create instance of a router
const router = express.Router();

// Add routes
// Send some data(formData) to backend - POST route
router.post("/signin", signin);
router.post("/signup", signup);

// export router
export default router;
