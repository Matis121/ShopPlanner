const userController = require("./userController");
const express = require("express");
const userRouter = express.Router();

userRouter.get("/new-user", userController.newUser);
userRouter.get("/get-all-lists", userController.getAllLists);
userRouter.get("/get-single-list", userController.getSingleList);
userRouter.post("/add-new-product", userController.addNewProduct);
userRouter.put("/update-product", userController.updateProduct);
userRouter.delete("/delete-product", userController.deleteProduct);
userRouter.delete("/delete-list", userController.deleteList);
userRouter.post("/create-new-list", userController.createNewList);

module.exports = userRouter;
