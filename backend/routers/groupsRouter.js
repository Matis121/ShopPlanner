const controller = require("../controllers/groupsController");
const express = require("express");
const groupsRouter = express.Router();

// GET
groupsRouter.get("/groups", controller.getAvailableGroups);
groupsRouter.get("/groups/:groupId/lists", controller.getGroupLists);
groupsRouter.get("/groups/:groupId/lists/:listId", controller.getSingleList);

// POST
groupsRouter.post("/groups/add-proposal", controller.createNewGroup);
groupsRouter.post(
  "/groups/:groupId/lists/add-proposal",
  controller.createNewList
);
groupsRouter.post(
  "/groups/:groupId/lists/:listId/products/add-proposal",
  controller.createNewProduct
);
groupsRouter.post(
  "/groups/:groupId/lists/:listId/products/add-proposal",
  controller.createNewProduct
);
groupsRouter.post("/groups/:groupId/invite-user", controller.inviteUser);

// UPDATE
groupsRouter.put(
  "/groups/:groupId/lists/:listId/change-proposal",
  controller.updateList
);
groupsRouter.put(
  "/groups/:groupId/lists/:listId/products/:productId/change-proposal",
  controller.updateProduct
);
groupsRouter.put(
  "/groups/:groupId/lists/:listId/products/:productId/edit",
  controller.editProduct
);

// DELETE
groupsRouter.delete("/groups/:groupId/delete-proposal", controller.deleteGroup);
groupsRouter.delete(
  "/groups/:groupId/lists/:listId/delete-proposal",
  controller.deleteList
);
groupsRouter.delete(
  "/groups/:groupId/lists/:listId/products/:productId/delete-proposal",
  controller.deleteProduct
);

module.exports = groupsRouter;
