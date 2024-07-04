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
userRouter.get(
  "/user/:userId/group-invitations",
  userController.getGroupInvitations
);

module.exports = userRouter;
