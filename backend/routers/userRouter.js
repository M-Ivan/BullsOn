import express from "express";
import expressAsyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import User from "../models/userModel.js";
import { generateToken, isAdmin, isAuth } from "../utils.js";

const userRouter = express.Router();

userRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    const user = req.query.user || "";

    const userFilter = user
      ? {
          username: {
            $regex: user,
            $options: "i",
          },
        }
      : {};
    const nameFilter = user
      ? {
          "profile.name": {
            $regex: user,
            $options: "i",
          },
        }
      : {};
    const lastnameFilter = user
      ? {
          "profile.lastname": {
            $regex: user,
            $options: "i",
          },
        }
      : {};

    const users = await User.find({
      ...userFilter,
    });
    if (users.length > 0) {
      res.send(users);
    } else if (users.length === 0) {
      const lastnameFilter = user
        ? {
            "profile.lastname": {
              $regex: user,
              $options: "i",
            },
          }
        : {};
      console.log("userDentro", user);
      const users = await User.find({
        ...lastnameFilter,
      });
      res.send(users);
    } else if (users.length === 0) {
      const nameFilter = user
        ? {
            "profile.name": {
              $regex: user,
              $options: "i",
            },
          }
        : {};
      console.log("userDentro", user);
      const users = await User.find({
        ...nameFilter,
      });
      res.send(users);
    }
  })
);

userRouter.post(
  "/signin",
  expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        res.send({
          _id: user._id,
          username: user.username,
          email: user.email,
          isAdmin: user.isAdmin,
          token: generateToken(user),
          profile: user.profile,
        });
        return;
      }
    }
    res.status(401).send({ message: "E-mail o contraseña incorrectos" });
  })
);

userRouter.post(
  "/register",
  expressAsyncHandler(async (req, res) => {
    const user = new User({
      _id: req.body.username,
      username: req.body.username,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
      profile: {
        name: req.body.name,
        lastname: req.body.lastname,
        description: req.body.description,
        username: req.body.username,
      },
    });
    const createdUser = await user.save();
    res.send({
      _id: createdUser._id,
      username: createdUser.username,
      email: createdUser.email,
      isAdmin: createdUser.isAdmin,
      token: generateToken(createdUser),
      profile: createdUser.profile,
    });
  })
);

userRouter.get(
  "/:username",
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.username);
    if (user) {
      res.send(user);
      console.log(user);
    } else {
      res.status(404).send({ message: "Usuario no encontrado" });
    }
  })
);

userRouter.put(
  "/:username/follow",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    // Usuario a seguir
    const userId = req.params.username;
    // el usuario objetivo de la request
    const user = await User.findByIdAndUpdate(userId);
    // followerUser = nuevo seguidor (el que hace request)
    const followerUser = await User.findByIdAndUpdate(req.user._id);
    if (user && followerUser) {
      //req.user._id esta poblado con
      //el usuario que hace el request.
      user.followers.push(req.user._id);
      followerUser.following.push(userId);
      const updatedUser = await user.save();
      const updatedFollower = await followerUser.save();
      console.log("followbase", updatedUser);
      console.log("follower", updatedFollower);
      res.status(201).send({
        message: `Siguiendo a ${updatedUser.username}`,
      });
    } else {
      res.status(404).send({
        message: "User no encontrado",
      });
    }
  })
);

userRouter.put(
  "/:username/unfollow",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const userId = req.params.username;
    const user = await User.findByIdAndUpdate(userId);
    const unfollowerUser = await User.findByIdAndUpdate(req.user._id);
    if (user && unfollowerUser) {
      user.followers.pull(req.user._id);
      unfollowerUser.following.pull(userId);
      const updatedUser = await user.save();
      const updatedUnfollower = await unfollowerUser.save();
      res.status(201).send({
        message: `Ya no estas siguiendo a ${updatedUser.username}`,
      });
      console.log("unfollowBase", updatedUser);
      console.log("unfollower", updatedUnfollower);
    } else {
      res.status(404).send({
        message: "User no encontrado",
      });
    }
  })
);

export default userRouter;
