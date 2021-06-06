import express from "express";
import expressAsyncHandler from "express-async-handler";
import data from "../data.js";
import Post from "../models/postModel.js";

import { isAdmin, isAuth } from "../utils.js";

const postRouter = express.Router();

postRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    const post = req.query.post || "";
    const profile = req.query.profile || "";

    const postFilter = post ? { post: { $regex: post, $options: "i" } } : {};
    const profileFilter = profile
      ? {
          profile: {
            $regex: profile,
            $options: "i",
          },
        }
      : {};
    const sortOrder = { likes: -1 } && { reposts: -1 } && { comments: -1 };
    const posts = await Post.find({
      ...postFilter,
      ...profileFilter,
    })
      .populate(
        "profile",
        "profile.name profile.lastname profile.profile profile.username"
      )
      .sort(sortOrder);

    res.send(posts);
  })
);

postRouter.get(
  "/db/seed",
  expressAsyncHandler(async (req, res) => {
    const createdPosts = await Post.insertMany(data.posts);
    res.send({ createdPosts });
  })
);

postRouter.get(
  "/reposts",
  expressAsyncHandler(async (req, res) => {
    const repost = req.query.profile || "";
    const repostFilter = repost ? { repost } : {};
    const posts = await Post.find({ ...repostFilter }).populate(
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

postRouter.delete(
  "/:id",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const post = await Post.findById(req.params.id);
    if (req.user._id === post.profile) {
      const deletePost = await post.remove();
      res.send({ message: "Post borrado", post: deletePost });
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
    } else {
      res.status(404).send({
        message: "Post no encontrado",
      });
    }
  })
);

postRouter.put(
  "/:id/comments/:commentId/likes",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const postId = req.params.id;
    const commentId = req.params.commentId;
    const post = await Post.findByIdAndUpdate(postId);
    // Cuando buscamos subdocumentos en mongoose
    // usamos id en lugar de la promise findById
    const comment = post.comments.id(commentId);

    if (comment) {
      comment.likes.push(req.body.username);
      await post.save();
      res.status(201).send({
        message: "Like publicado",
      });
    } else {
      res.status(404).send({
        message: "Comentario no encontrado",
      });
    }
  })
);

postRouter.put(
  "/:id/comments/:commentId/unlike",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const postId = req.params.id;
    const commentId = req.params.commentId;
    const post = await Post.findByIdAndUpdate(postId);
    // Cuando buscamos subdocumentos en mongoose
    // usamos id en lugar de la promise findById
    const comment = post.comments.id(commentId);

    if (comment) {
      comment.likes.pull(req.body.username);
      await post.save();
      res.status(201).send({
        message: "Like removido",
      });
    } else {
      res.status(404).send({
        message: "Comentario no encontrado",
      });
    }
  })
);

postRouter.delete(
  "/:id/comments/:commentId",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const postId = req.params.id;
    const commentId = req.params.commentId;
    const post = await Post.findByIdAndUpdate(postId);
    // Cuando buscamos subdocumentos en mongoose
    // usamos id en lugar de la promise findById
    const comment = post.comments.id(commentId);

    if (comment) {
      const deleteComment = await comment.remove();
      await post.save();
      res.status(201).send({
        message: "Comentario borrado",
        post: deleteComment,
      });
    } else {
      res.status(404).send({
        message: "Comentario no encontrado",
      });
    }
  })
);

postRouter.delete(
  "/:id",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const post = await Post.findById(req.params.id);
    if (req.user._id === post.profile) {
      const deletePost = await post.remove();
      res.send({ message: "Post borrado", post: deletePost });
    } else {
      res.status(404).send({ message: "Post no encontrado" });
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
      await post.save();
      res.status(201).send({
        message: "Like publicado",
      });
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
      await post.save();
      res.status(201).send({
        message: "Like removido",
      });
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
      await post.save();
      res.status(201).send({
        message: "Reposteado",
      });
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
      await post.save();
      res.status(201).send({
        message: "Repost deshecho",
      });
    } else {
      res.status(404).send({
        message: "Post no encontrado",
      });
    }
  })
);

export default postRouter;
