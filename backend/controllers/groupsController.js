const { GroupUser, Group, List, User } = require("../models");

// GET
const getAvailableGroups = async (req, res, next) => {
  const { userId } = req.query;
  try {
    const user = await User.findOne({ _id: userId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const activeGroups = user.groups;

    const groups = await Group.find({
      _id: { $in: activeGroups },
    });

    return res.status(200).json(groups);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};
const getGroupLists = async (req, res, next) => {
  const { groupId } = req.params;
  try {
    const group = await Group.findOne({ _id: groupId });
    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }
    return res.json({ groupName: group.name, listsInGroup: group.lists });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};
const getSingleList = async (req, res, next) => {
  const { listId, groupId } = req.params;
  try {
    const group = await Group.findOne({ _id: groupId });
    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }
    const list = group.lists.find(list => list._id.toString() === listId);
    if (!list) {
      return res.status(404).json({ message: "List not found" });
    }
    return res.json(list);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

// POST
const createNewGroup = async (req, res, next) => {
  const { name, userId } = req.body;
  try {
    const user = await User.findOne({ _id: userId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const admin = new GroupUser({
      _id: userId,
      status: "active",
      role: "admin",
    });
    const group = new Group({
      name: name,
      users: [admin],
    });
    await group.save();

    user.groups.push(group._id.toString());
    await user.save();
    return res
      .status(200)
      .json({ message: "Group added successfully", group: group });
  } catch (error) {
    console.log(error);
  }
};
const createNewList = async (req, res) => {
  const { groupId } = req.params;
  const { name, description } = req.body;
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
const createNewProduct = async (req, res) => {
  const { listId, groupId } = req.params;
  const { productName } = req.body;
  try {
    const group = await Group.findById(groupId);
    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }
    const list = group.lists.find(list => list._id.toString() === listId);
    if (!list) {
      return res.status(404).json({ message: "List not found" });
    }
    list.productList.push({ name: productName });
    await group.save();
    return res
      .status(200)
      .json({ message: "Product added successfully", list: list });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};
const inviteUser = async (req, res) => {
  const { groupId } = req.params;
  const { email } = req.body;
  try {
    const user = await User.findOne({ email: email });
    const group = await Group.findOne({ _id: groupId });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    if (
      group.users.some(
        groupUser =>
          groupUser._id === user._id.toString() &&
          groupUser.status === "invited"
      )
    ) {
      return res.status(404).json({ error: "User is already invited" });
    }
    if (
      group.users.some(
        groupUser =>
          groupUser._id === user._id.toString() && groupUser.status === "active"
      )
    ) {
      return res.status(404).json({ error: "User is already member of group" });
    }

    user.groupInvitations.push({
      groupId: groupId,
      groupName: group.name,
    });
    await user.save();

    const invitedUser = new GroupUser({
      _id: user._id,
      status: "invited",
    });
    group.users.push(invitedUser);
    await group.save();

    return res.status(200).json({ message: "Invitation sent successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to send invitation" });
  }
};

// UPDATE
const updateList = async (req, res) => {
  const { groupId, listId } = req.params;
  const { listName, listDesc } = req.body;
  try {
    const group = await Group.findOne({ _id: groupId });
    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }

    // Find the list inside the user's lists
    const list = group.lists.find(list => String(list._id) === listId);
    if (!list) {
      return res.status(404).json({ message: "List not found" });
    }

    // Update the name and description if provided
    if (listName) {
      list.name = listName;
    }
    list.description = listDesc;

    // Save the changes to the user
    await group.save();

    res.status(200).json({ message: "List updated successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};
const updateProduct = async (req, res) => {
  const { groupId, listId, productId } = req.params;
  try {
    const group = await Group.findById(groupId);
    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }

    // Find the list inside the user's lists
    const list = group.lists.find(list => String(list._id) === listId);
    if (!list) {
      return res.status(404).json({ message: "List not found" });
    }

    const product = list.productList.find(product => product.id === productId);

    if (product.isCollected) {
      product.isCollected = false;
    } else {
      product.isCollected = true;
    }

    await group.save();

    res.status(200).json({ message: "Product updated successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

// DELETE
const deleteGroup = async (req, res) => {
  const { groupId } = req.params;
  try {
    const group = await Group.findOneAndDelete({ _id: groupId });

    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }

    await User.updateMany({ groups: groupId }, { $pull: { groups: groupId } });

    res.status(200).json({ message: "Group deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};
const deleteList = async (req, res) => {
  const { groupId, listId } = req.params;
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
const deleteProduct = async (req, res) => {
  const { groupId, listId, productId } = req.params;
  try {
    const group = await Group.findOneAndUpdate(
      { _id: groupId, "lists._id": listId },
      { $pull: { "lists.$.productList": { _id: productId } } }
    );

    if (!group) {
      return res.status(404).json({ message: "Group or list not found" });
    }

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getGroupLists,
  getAvailableGroups,
  getSingleList,
  createNewList,
  deleteGroup,
  updateList,
  updateProduct,
  deleteList,
  deleteProduct,
  createNewProduct,
  createNewGroup,
  createNewGroup,
  inviteUser,
};
