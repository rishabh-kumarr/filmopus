import mongoose from "mongoose";

// Schema - Specify what every post needs to have
const postSchema = mongoose.Schema({
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
    },
    name: {
      type: String,
      required: [true, "Creator name is required"],
    },
    creator: {
      type: String,
      required: [true, "Creator ID is required"],
    },
    tags: {
      type: [String],
      default: [],
    },
    selectedFile: {
      type: String,
    },
    likes: {
      type: [String],
      default: [],
    },
    createdAt: { type: Date, default: new Date() },
});

// Turn Schema into a model
var Posts = mongoose.model("Posts", postSchema);

export default Posts;
