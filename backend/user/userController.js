const User = require("./userModel");
const List = require("./userModel");

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

// GET METHODS

const getUserLists = async (req, res, next) => {
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

// ADD METHODS

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

module.exports = {
  newUser,
  getUserLists,
  createNewList,
};
