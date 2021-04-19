import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    _id: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false, required: true },
    followers: [{ type: String, ref: "User" }],
    following: [{ type: String, ref: "User" }],
    disabled: { type: Boolean, default: false },
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
