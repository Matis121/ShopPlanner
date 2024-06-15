const userController = require("../controllers/userController");
const express = require("express");
const userRouter = express.Router();

// SINGLE USER
userRouter.post("/user/register", userController.register);
userRouter.post("/user/login", userController.login);

module.exports = userRouter;
