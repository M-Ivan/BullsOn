import express from "express";
import expressAsyncHandler from "express-async-handler";
import Post from "../models/postModel.js";

import { isAdmin, isAuth } from "../utils.js";

const postRouter = express.Router();

postRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    const post = req.query.post || "";
    const author = req.query.author || "";

    const postFilter = post ? { post: { $regex: post, $options: "i" } } : {};
    const authorFilter = author ? { author } : {};

    const posts = await Post.find({
      ...postFilter,
      ...authorFilter,
    }).populate("author", "author.name");
    res.send(posts);
  })
);

postRouter.post(
  "/",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const post = new Post({
      post: req.body.post,
      author: req.user._id,
      image: req.body.image ? req.body.image : null,
    });
    const createdPost = await post.save();
    res.send({ message: "Post creado", post: createdPost });
  })
);

postRouter.get(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const post = await Post.findById(req.params.id).populate(
      "author",
      "author.name author.profilePic"
    );
    if (post) {
      res.send(post);
    } else {
      res.status(404).send({ message: "Post no encontrado" });
    }
  })
);

postRouter.post(
  "/:id/comments",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const postId = req.params.id;
    const post = await Post.findById(productId);
    if (post) {
      const comment = {
        author: req.user._id,
        comment: req.body.comment,
      };
      post.comments.push(comment);
      const updatedPost = await post.save();
      res.status(201).send({
        message: "Comentario publicado",
        comment: updatedPost.comments[updatedPost.comments.length - 1],
      });
    } else {
      res.status(404).send({
        message: "Post no encontrado",
      });
    }
  })
);

export default postRouter;
