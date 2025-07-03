import express from "express";

// Get the logic of routes from controllers
import {
    getPosts,
    getPost,
    getPostsBySearch,
    getPostsByCreator,
    createPost,
    updatePost,
    deletePost,
    likePost,
} from "../controllers/posts.js";

import auth from "../middleware/auth.js";

// set up the router
const router = express.Router();

// ==== READ ROUTES ====
router.get("/", getPosts);                    // GET all posts
router.get("/search", getPostsBySearch);     // GET posts by search query
router.get("/creator", getPostsByCreator);   // GET posts by creator
router.get("/:id", getPost);                 // GET a single post by ID

// ==== WRITE ROUTES (Protected) ====
router.post("/", auth, createPost);                    // Create new post
router.patch("/:id", auth, updatePost);                // Update post
router.delete("/:id", auth, deletePost);               // Delete post
router.patch("/:id/likePost", auth, likePost);         // Like a post

export default router;
