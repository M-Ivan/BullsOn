import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    profile: { type: mongoose.Schema.Types.String, ref: "User" },
    comment: { type: String, required: true },
    likes: [{ type: String, ref: "User" }],
  },
  { timestamps: true }
);

export const postSchema = new mongoose.Schema(
  {
    post: { type: String, required: true },
    likes: [{ type: String, ref: "User" }],
    repost: [{ type: String, ref: "User" }],
    image: { type: String, required: false, default: "" },
    // Usamos String en lugar de ObjectId para encontrar el perfil
    // Por el username, ya que el campo _id en userModel sera el mismo
    // que el username, y no sera, un _id aleatorio creado por
    // MongoDB
    profile: { type: mongoose.Schema.Types.String, ref: "User" },
    comments: [commentSchema],
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model("Post", postSchema);

export default Post;
