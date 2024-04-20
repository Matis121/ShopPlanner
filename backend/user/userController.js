const User = require("./userModel");

const newUser = async (req, res, next) => {
  try {
    const user = new User({
      name: "testowy",
      email: "mateusz62@gmail.com",
      lists: {
        name: "first list",
        description: "first description",
        productList: [{ name: "firstProduct", amount: 5, isCollected: false }],
      },
    });
    await user.save();
  } catch {
    console.log(e.error);
  }
};

const getUser = async (req, res, next) => {
  try {
    const user = await User.findOne({ name: "testowy" });
    console.log("done");
    return res.json({ user: user });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  newUser,
  getUser,
};
