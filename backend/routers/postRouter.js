import express from "express";
import expressAsyncHandler from "express-async-handler";
import Post from "../models/postModel.js";

import { isAdmin, isAuth } from "../utils.js";

const postRouter = express.Router();

postRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    const post = req.query.post || "";
    const profile = req.query.profile || "";

    const postFilter = post ? { post: { $regex: post, $options: "i" } } : {};
    const profileFilter = profile ? { profile } : {};

    const posts = await Post.find({
      ...postFilter,
      ...profileFilter,
    }).populate(
      "profile",
      "profile.name profile.lastname profile.profile profile.username"
    );
    res.send(posts);
  })
);

postRouter.post(
  "/",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const post = new Post({
      post: req.body.post,
      profile: req.user._id,
      image: req.body.image ? req.body.image : null,
    });
    const createdPost = await post.save();
    res.send({ message: "Post creado", post: createdPost });
  })
);

postRouter.post(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const post = await Post.findById(req.params.id);
    if (post) {
      post.likes + 1;

      res.send(post);
    } else {
      res.status(404).send({ message: "Post no encontrado" });
    }
  })
);

postRouter.get(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const post = await Post.findById(req.params.id).populate(
      "profile comments.profile",
      "profile.name profile.lastname profile.profile profile.username"
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
    const post = await Post.findById(postId);
    if (post) {
      const comment = {
        profile: req.user._id,
        comment: req.body.comment,
      };
      post.comments.push(comment);

      const updatedPost = await post.save();
      res.status(201).send({
        message: "Comentario publicado",
        comment: updatedPost.comments[updatedPost.comments.length - 1],
      });
      console.log(updatedPost.comments);
    } else {
      res.status(404).send({
        message: "Post no encontrado",
      });
    }
  })
);

postRouter.put(
  "/:id/likes",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const postId = req.params.id;
    const post = await Post.findByIdAndUpdate(postId);
    if (post) {
      post.likes.push(req.body.username);
      const updatedPost = await post.save();
      res.status(201).send({
        message: "Like publicado",
      });
      console.log("likeado", updatedPost);
    } else {
      res.status(404).send({
        message: "Post no encontrado",
      });
    }
  })
);

postRouter.put(
  "/:id/unlike",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const postId = req.params.id;
    const post = await Post.findByIdAndUpdate(postId);
    if (post) {
      post.likes.pull(req.body.username);
      const updatedPost = await post.save();
      res.status(201).send({
        message: "Like removido",
      });
      console.log("deslikeado", updatedPost);
    } else {
      res.status(404).send({
        message: "Post no encontrado",
      });
    }
  })
);

postRouter.put(
  "/:id/repost",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const postId = req.params.id;
    const post = await Post.findByIdAndUpdate(postId);
    if (post) {
      post.repost.push(req.body.username);
      const updatedPost = await post.save();
      res.status(201).send({
        message: "Reposteado",
      });
      console.log("repost", updatedPost);
    } else {
      res.status(404).send({
        message: "Post no encontrado",
      });
    }
  })
);

postRouter.put(
  "/:id/unrepost",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const postId = req.params.id;
    const post = await Post.findByIdAndUpdate(postId);
    if (post) {
      post.repost.pull(req.body.username);
      const updatedPost = await post.save();
      res.status(201).send({
        message: "Repost deshecho",
      });
      console.log("desrepost", updatedPost);
    } else {
      res.status(404).send({
        message: "Post no encontrado",
      });
    }
  })
);

export default postRouter;
