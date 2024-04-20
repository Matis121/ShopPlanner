const userController = require("./userController");
const express = require("express");
const userRouter = express.Router();

userRouter.get("/new-user", userController.newUser);
userRouter.get("/get-user", userController.getUser);

module.exports = userRouter;
