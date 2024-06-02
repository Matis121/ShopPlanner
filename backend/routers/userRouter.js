const userController = require("../controllers/userController");
const express = require("express");
const userRouter = express.Router();

// SINGLE USER
userRouter.get("/new-user", userController.newUser);

module.exports = userRouter;
