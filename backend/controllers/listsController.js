const { User, Product } = require("../models");

// GET
const getAllLists = async (req, res, next) => {
  const { userId } = req.query;
  try {
    const user = await User.findOne({ _id: userId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.json(user.lists);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

const getSingleList = async (req, res, next) => {
  const { listId } = req.params;
  const { userId } = req.query;
  try {
    // Find the user
    const user = await User.findOne({ _id: userId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Find the list inside the user's lists
    const list = user.lists.find(list => String(list._id) === listId);

    if (!list) {
      return res.status(404).json({ message: "List not found" });
    }

    return res.json(list);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

// ADD
const createNewList = async (req, res) => {
  const { newListData, userId } = req.body;
  try {
    const user = await User.findOne({ _id: userId });
    const newList = {
      name: newListData.name,
      description: newListData.description,
    };
    user.lists.push(newList);
    await user.save();
    return res.json(newList);
  } catch (error) {
    console.error(error);
    throw new Error("Failed to create list");
  }
};

const addNewProduct = async (req, res, next) => {
  const { listId } = req.params;
  const { productName, userId } = req.body;
  try {
    const user = await User.findOne({ _id: userId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const list = user.lists.find(list => String(list._id) === listId);
    if (!list) {
      return res.status(404).json({ message: "List not found" });
    }

    list.productList.push({ name: productName });
    await user.save();
    return res
      .status(200)
      .json({ message: "Product added successfully", list: list });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

// UPDATE
const updateList = async (req, res) => {
  const { listId } = req.params;
  const { userId, listName, listDesc } = req.body;
  try {
    // Find the user
    const user = await User.findOne({ _id: userId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Find the list inside the user's lists
    const list = user.lists.find(list => String(list._id) === listId);
    if (!list) {
      return res.status(404).json({ message: "List not found" });
    }

    // Update the name and description if provided
    if (listName) {
      list.name = listName;
    }
    list.description = listDesc;

    // Save the changes to the user
    await user.save();

    res.status(200).json({ message: "List updated successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

const updateProduct = async (req, res) => {
  const { listId, productId } = req.params;
  const { userId } = req.body;
  console.log(listId, productId);
  try {
    // Find the user
    const user = await User.findOne({ _id: userId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Find the list inside the user's lists
    const list = user.lists.find(list => String(list._id) === listId);
    if (!list) {
      return res.status(404).json({ message: "List not found" });
    }

    const product = list.productList.find(product => product.id === productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (product.isCollected) {
      product.isCollected = false;
    } else {
      product.isCollected = true;
    }

    await user.save();

    res.status(200).json({ message: "Product updated successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

const editProduct = async (req, res) => {
  const { listId, productId } = req.params;
  const { userId, productName, productQty } = req.body;
  try {
    // Find the user
    const user = await User.findOne({ _id: userId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Find the list inside the user's lists
    const list = user.lists.find(list => String(list._id) === listId);
    if (!list) {
      return res.status(404).json({ message: "List not found" });
    }

    const product = list.productList.find(product => product.id === productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Update product properties
    product.name = productName;
    product.amount = productQty;

    await user.save();

    res.status(200).json({ message: "Product updated successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

// DELETE
const deleteProduct = async (req, res) => {
  const { listId, productId } = req.params;
  const { userId } = req.query;
  try {
    const user = await User.findOneAndUpdate(
      { _id: userId, "lists._id": listId },
      { $pull: { "lists.$.productList": { _id: productId } } }
    );

    if (!user) {
      return res.status(404).json({ message: "User or list not found" });
    }

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

const deleteList = async (req, res) => {
  const { listId } = req.params;
  const { userId } = req.query;
  try {
    const user = await User.findOneAndUpdate(
      { _id: userId, "lists._id": listId },
      { $pull: { lists: { _id: listId } } }
    );

    if (!user) {
      return res.status(404).json({ message: "User or list not found" });
    }

    res.status(200).json({ message: "List deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllLists,
  getSingleList,
  createNewList,
  addNewProduct,
  updateList,
  updateProduct,
  deleteList,
  deleteProduct,
  editProduct,
};
