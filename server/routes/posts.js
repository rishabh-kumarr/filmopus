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

// Routes - path
router.get("/creator", getPostsByCreator);
router.get("/search", getPostsBySearch);
router.get("/", getPosts);
router.get("/:id", getPost);

router.post("/", auth, createPost);

// patch - used for updating existing documents
router.patch("/:id", auth, updatePost);

// delete - used for removing a post
router.delete("/:id", auth, deletePost);

// Like logic - update action so patch
router.patch("/:id/likePost", auth, likePost);

export default router;
