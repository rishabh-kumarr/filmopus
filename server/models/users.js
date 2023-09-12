import mongoose from "mongoose";

// Create Schema
const userSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    id: { type: String },
});

// Create a model
var User = mongoose.model("User", userSchema);

export default User;
