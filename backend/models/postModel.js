import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    comment: { type: String, required: true },
    likes: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const postSchema = new mongoose.Schema(
  {
    post: { type: String, required: true },
    likes: { type: Number, default: 0 },
    image: { type: String, required: false, default: "" },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    comments: [commentSchema],
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model("Post", postSchema);

export default Post;
