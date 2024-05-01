const userController = require("./userController");
const express = require("express");
const userRouter = express.Router();

userRouter.get("/new-user", userController.newUser);
userRouter.get("/get-user-lists", userController.getUserLists);
userRouter.post("/create-new-list", userController.createNewList);

module.exports = userRouter;
