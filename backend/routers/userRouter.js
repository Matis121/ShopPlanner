const userController = require("../controllers/userController");
const express = require("express");
const userRouter = express.Router();

// SINGLE USER
userRouter.post("/user/register", userController.register);
userRouter.post("/user/login", userController.login);
userRouter.post(
  "/user/group-invitation/confirm",
  userController.confirmGroupInvitation
);
userRouter.post(
  "/user/group-invitation/reject",
  userController.rejectGroupInvitation
);

module.exports = userRouter;
