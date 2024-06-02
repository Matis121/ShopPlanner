const controller = require("../controllers/listsController");
const express = require("express");
const listsRouter = express.Router();

// GET
listsRouter.get("/lists", controller.getAllLists);
listsRouter.get("/lists/:listId", controller.getSingleList);

// POST
listsRouter.post("/lists", controller.createNewList);
listsRouter.post("/lists/:listId", controller.addNewProduct);

// UPDATE
listsRouter.put("/lists/:listId", controller.updateList);
listsRouter.put("/lists/:listId/products/:productId", controller.updateProduct);

// DELETE
listsRouter.delete("/lists/:listId", controller.deleteList);
listsRouter.delete(
  "/lists/:listId/products/:productId",
  controller.deleteProduct
);

module.exports = listsRouter;
