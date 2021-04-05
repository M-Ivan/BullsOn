import mongoose from "mongoose";
import { postSchema } from "./postModel.js";

const userSchema = new mongoose.Schema(
  {
    _id: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false, required: true },
    followers: { type: Number, default: 0 },
    following: { type: Number, default: 0 },
    profile: {
      name: String,
      lastname: String,
      profile: String,
      description: String,
      username: String,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
export default User;
