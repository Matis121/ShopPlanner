const { User } = require("../models");

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

module.exports = {
  newUser,
};
