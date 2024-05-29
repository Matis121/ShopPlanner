const { User, Group, List } = require("./userModel");

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
  } catch (error) {
    console.log(error);
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
const getGroupLists = async (req, res, next) => {
  const { groupId } = req.query;
  try {
    const group = await Group.findOne({ _id: groupId });
    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }
    return res.json(group.lists);
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
const getAvaibleGroups = async (req, res, next) => {
  try {
    const groups = await Group.find();
    return res.status(200).json(groups);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

// ADD
const createNewList = async (req, res) => {
  const newListData = req.body;
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
const createNewListInGroup = async (req, res) => {
  const { name, description, groupId } = req.body;
  try {
    const group = await Group.findOne({ _id: groupId });

    if (!group) {
      return res.status(404).json({ error: "Group not found" });
    }

    const newList = new List({
      name: name,
      description: description,
    });

    group.lists.push(newList);
    await group.save();

    return res.status(200).json(newList);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to create list" });
  }
};
const addNewProduct = async (req, res, next) => {
  const listQueryId = req.body.listId;
  const newProduct = { name: req.body.productName };
  try {
    const user = await User.findOne({ name: "testowy2" });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const list = user.lists.find(list => String(list._id) === listQueryId);
    if (!list) {
      return res.status(404).json({ message: "List not found" });
    }

    list.productList.push(newProduct);
    await user.save();
    return res
      .status(200)
      .json({ message: "Product added successfully", list: list });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

const createNewGroup = async (req, res, next) => {
  const { name, description } = req.body;
  try {
    const group = new Group({
      name: name,
    });
    await group.save();
    return res
      .status(200)
      .json({ message: "Group added successfully", group: group });
  } catch (error) {
    console.log(error);
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

    await user.save();

    res.status(200).json({ message: "Product updated successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};
const updateList = async (req, res) => {
  const { listId, listName, listDesc } = req.body;
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

    // Update the name and description if provided
    if (listName) {
      list.name = listName;
    }
    if (listDesc) {
      list.description = listDesc;
    }

    // Save the changes to the user
    await user.save();

    res.status(200).json({ message: "List updated successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

// DELETE
const deleteProduct = async (req, res) => {
  const { listId, productId } = req.body;
  try {
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
const deleteList = async (req, res) => {
  const { listId } = req.body;
  try {
    const user = await User.findOneAndUpdate(
      { name: "testowy2", "lists._id": listId },
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

const deleteListInGroup = async (req, res) => {
  const { groupId, listId } = req.body;
  try {
    const group = await Group.findOneAndUpdate(
      { _id: groupId, "lists._id": listId },
      { $pull: { lists: { _id: listId } } }
    );

    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }

    res.status(200).json({ message: "List deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

const deleteGroup = async (req, res) => {
  const { groupId } = req.body;
  try {
    const group = await Group.findOneAndDelete({ _id: groupId });

    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }

    res.status(200).json({ message: "Group deleted successfully" });
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
  deleteList,
  updateList,
  getAvaibleGroups,
  createNewGroup,
  createNewListInGroup,
  getGroupLists,
  deleteListInGroup,
  deleteGroup,
};
