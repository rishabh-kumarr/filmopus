// Handlers for our routes - Store the logic(callback function of the router.get)
import mongoose from "mongoose";
import Posts from "../models/posts.js";

const LIMIT = 4; // Number of posts per page

// Retrieve all posts in the database - GET request
export const getPosts = async (req, res) => {
  const { page = 1 } = req.query;
  try {
    const startIndex = (Number(page) - 1) * LIMIT;

    const total = await Posts.countDocuments({});
    const posts = await Posts.find()
      .sort({ _id: -1 })
      .limit(LIMIT)
      .skip(startIndex);

    // If everything works - Send all posts from database
    res.status(200).json({
      data: posts,
      currentPage: Number(page),
      numberOfPages: Math.ceil(total / LIMIT),
    });
  } catch (error) {
    // If can't retrieve all posts from database
    // console.error(`Error2: ${error}`);
    res
      .status(500)
      .json({ message: "Failed to fetch posts.", error: error.message });
  }
};

// === Get posts by search query or tags ===
export const getPostsBySearch = async (req, res) => {
  const { searchQuery, tags } = req.query;

  try {
    const title = new RegExp(searchQuery, "i");

    const posts = await Posts.find({
      $or: [{ title }, { tags: { $in: tags?.split(",") } }],
    });

    res.status(200).json({ data: posts });
  } catch (error) {
    // console.error(`Error3: ${error}`);
    res.status(500).json({ message: "Search failed.", error: error.message });
  }
};

// === Get posts by creator name ===
export const getPostsByCreator = async (req, res) => {
  const { name } = req.query;

  try {
    const posts = await Posts.find({ name });

    res.status(200).json({ data: posts });
  } catch (error) {
    // console.error(`Error4: ${error}`);
    res
      .status(500)
      .json({ message: "Creator search failed.", error: error.message });
  }
};

// === Get single post by ID ===
export const getPost = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await Posts.findById(id);
    if (!post) return res.status(404).json({ message: "Post not found." });

    res.status(200).json(post);
  } catch (error) {
    // console.error(`Error5: ${error}`);
    res
      .status(500)
      .json({ message: "Failed to fetch post.", error: error.message });
  }
};

// === Create a new post ===
export const createPost = async (req, res) => {
  // With POST request we have access to posts
  const post = req.body;

  const newPost = new Posts({
    ...post,
    creator: req.userId,
    createdAt: new Date().toISOString(),
  });

  try {
    // Save the created post - 201: Successfull creation
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    // Couldn't create post
    // console.error(`Error6: ${error}`);
    res
      .status(400)
      .json({ message: "Failed to create post.", error: error.message });
  }
};

// === Update an existing post ===
export const updatePost = async (req, res) => {
  // Get the id of the post that needs editing - id is stored as _id in MongoDB
  const { id } = req.params;

  // Receiving the updated data here from frontend
  const { title, description, creator, selectedFile, tags } = req.body;

  // Check if the id is valid - What to do if not valid
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`There was no post with id: ${id}`);

  const updatedPostData = {
    creator,
    title,
    description,
    tags,
    selectedFile,
    _id: id,
  };

  try {
    // What to do if the id is valid - Update the post(call our model - posts)
    // new: true - To receive the updated version of the post - We have access and database is also updated
    const updatedPost = await Posts.findByIdAndUpdate(id, updatedPostData, {
      new: true,
    });

    // Send the updated post
    res.status(200).json(updatedPost);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Failed to update post.", error: error.message });
  }
};

// === Delete a post ===
export const deletePost = async (req, res) => {
  // Get the id of the post that needs editing - id is stored as _id in MongoDB
  const { id } = req.params;

  // Check if the id is valid - What to do if not valid
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`There was no post with id: ${id}`);

  try {
    // How to delete if id is valid
    await Posts.findByIdAndRemove(id);

    // Delete Response
    res.json({ message: "Post deleted successfully!" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete post.", error: error.message });
  }
};

// === Like or unlike a post ===
export const likePost = async (req, res) => {
  // Get id of the post that is liked
  const { id } = req.params;

  // Check if user isauthenticated
  if (!req.userId)
    return res.status(401).json({ message: "User is not authenticated!!" });

  // Check if the id is valid - What to do if not valid
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`There was no post with id: ${id}`);

  try {
    // Get the particular post where LIKE action is done
    const post = await Posts.findById(id);

    // Check if it is already liked by user or not
    const index = post.likes.findIndex((id) => id === String(req.userId));

    if (index === -1) {
      // If user has not liked
      post.likes.push(req.userId);
    } else {
      // If user has already liked then dislike
      post.likes = post.likes.filter((id) => id !== String(req.userId));
    }

    // How to implement like feature by updating the post
    const updatedPost = await Posts.findByIdAndUpdate(id, post, {
      new: true,
    });

    // Send the updated response
    res.status(200).json(updatedPost);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to like/unlike post.", error: error.message });
  }
};
