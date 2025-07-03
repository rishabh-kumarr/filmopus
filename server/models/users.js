import mongoose from "mongoose";

// Create Schema
const userSchema = mongoose.Schema({
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password should be at least 6 characters"],
    },
    id: {
      type: String,
    },
});

// Create a model
var User = mongoose.model("User", userSchema);

export default User;
