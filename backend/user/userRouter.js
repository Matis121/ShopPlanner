const userController = require("./userController");
const express = require("express");
const userRouter = express.Router();

// SINGLE USER
userRouter.get("/new-user", userController.newUser);
userRouter.get("/get-all-lists", userController.getAllLists);
userRouter.get("/get-single-list", userController.getSingleList);
userRouter.post("/add-new-product", userController.addNewProduct);
userRouter.put("/update-product", userController.updateProduct);
userRouter.put("/update-list", userController.updateList);
userRouter.put("/update-list-in-group", userController.updateListInGroup);
userRouter.put("/update-product-in-group", userController.updateProductInGroup);
userRouter.delete("/delete-product", userController.deleteProduct);
userRouter.delete(
  "/delete-product-in-group",
  userController.deleteProductInGroup
);
userRouter.delete("/delete-list", userController.deleteList);
userRouter.post("/create-new-list", userController.createNewList);

// GROUPS
userRouter.post("/create-new-group", userController.createNewGroup);
userRouter.post(
  "/create-new-list-in-group",
  userController.createNewListInGroup
);
userRouter.get("/get-all-avaible-groups", userController.getAvaibleGroups);
userRouter.get("/get-group-lists", userController.getGroupLists);
userRouter.delete("/delete-list-in-group", userController.deleteListInGroup);
userRouter.delete("/delete-group", userController.deleteGroup);
userRouter.post(
  "/add-new-product-in-group",
  userController.addNewProductInGroup
);
userRouter.get(
  "/get-single-list-in-group",
  userController.getSingleListInGroup
);

module.exports = userRouter;
