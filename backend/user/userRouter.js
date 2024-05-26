const userController = require("./userController");
const express = require("express");
const userRouter = express.Router();

userRouter.get("/new-user", userController.newUser);
userRouter.get("/get-all-lists", userController.getAllLists);
userRouter.get("/get-single-list", userController.getSingleList);
userRouter.post("/add-new-product", userController.addNewProduct);
userRouter.put("/update-product", userController.updateProduct);
userRouter.put("/update-list", userController.updateList);
userRouter.delete("/delete-product", userController.deleteProduct);
userRouter.delete("/delete-list", userController.deleteList);
userRouter.post("/create-new-list", userController.createNewList);

userRouter.post("/create-new-group", userController.createNewGroup);
userRouter.get("/get-all-avaible-groups", userController.getAvaibleGroups);

module.exports = userRouter;
