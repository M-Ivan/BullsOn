import express from "express";
import expressAsyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import User from "../models/userModel.js";
import { generateToken, isAdmin, isAuth } from "../utils.js";

const userRouter = express.Router();

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

export default userRouter;
