import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false, required: true },
    followers: { type: Number, default: 0 },
    following: { type: Number, default: 0 },
    author: {
      name: { type: String, default: "nombre" },
      profilePic: { type: String, default: "/images/p1.jpg" },
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
export default User;
