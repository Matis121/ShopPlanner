const User = require("./userModel");
const List = require("./userModel");
const Product = require("./userModel");

const newUser = async (req, res, next) => {
  try {
    const user = new User({
      name: "testowy2",
      email: "mateusz62@gmail.com",
      lists: [
        {
          name: "first list",
          description: "first description",
          productList: [
            { name: "firstProduct", amount: 5, isCollected: false },
          ],
        },
      ],
    });
    await user.save();
  } catch {
    console.log(e.error);
  }
};

// GET
const getAllLists = async (req, res, next) => {
  try {
    const user = await User.findOne({ name: "testowy2" });
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
  const listQueryId = req.query.listId;
  try {
    // Find the user
    const user = await User.findOne({ name: "testowy2" });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Find the list inside the user's lists
    const list = user.lists.find(list => String(list._id) === listQueryId);

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
  const newListData = req.body;
  console.log(newListData);
  try {
    const user = await User.findOne({ name: "testowy2" });
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
  const listQueryId = req.body.listId;
  const newProduct = { name: req.body.productName };
  console.log(listQueryId, newProduct);
  try {
    // Find the user
    const user = await User.findOne({ name: "testowy2" });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Find the list inside the user's lists
    const list = user.lists.find(list => String(list._id) === listQueryId); // Convert list._id to string for comparison
    if (!list) {
      return res.status(404).json({ message: "List not found" });
    }

    list.productList.push(newProduct);
    // Save the updated list
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
const updateProduct = async (req, res) => {
  const { listId, productId } = req.body;
  try {
    // Find the user
    const user = await User.findOne({ name: "testowy2" });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Find the list inside the user's lists
    const list = user.lists.find(list => String(list._id) === listId);
    if (!list) {
      return res.status(404).json({ message: "List not found" });
    }

    const product = list.productList.find(product => product.id === productId);

    if (product.isCollected) {
      product.isCollected = false;
    } else {
      product.isCollected = true;
    }

    console.log(product);

    await user.save();

    res.status(200).json({ message: "Product updated successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

// DELETE

const deleteProduct = async (req, res) => {
  const { listId, productId } = req.body;
  try {
    // Find the user and update the list
    const user = await User.findOneAndUpdate(
      { name: "testowy2", "lists._id": listId },
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

module.exports = {
  newUser,
  getAllLists,
  getSingleList,
  createNewList,
  updateProduct,
  addNewProduct,
  deleteProduct,
};
