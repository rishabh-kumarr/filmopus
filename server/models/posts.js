import mongoose from "mongoose";

// Schema - Specify what every post needs to have
const postSchema = mongoose.Schema({
    title: String,
    description: String,
    name: String,
    creator: String,
    tags: [String],
    selectedFile: String,
    likes: { type: [String], default: [] },
    createdAt: { type: Date, default: new Date() },
});

// Turn Schema into a model
var Posts = mongoose.model("Posts", postSchema);

export default Posts;
