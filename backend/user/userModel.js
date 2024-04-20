const mongoose = require("mongoose");

const listSchema = new mongoose.Schema({
  name: String,
  description: String,
  createdAt: {
    type: Date,
    immutable: true,
    default: () => Date.now(),
  },
  updatedAt: {
    type: Date,
    default: () => Date.now(),
  },
  productList: [
    {
      name: String,
      amount: Number,
      isCollected: Boolean,
    },
  ],
});

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  createdAt: {
    type: Date,
    immutable: true,
    default: () => Date.now(),
  },
  updatedAt: {
    type: Date,
    default: () => Date.now(),
  },
  lists: listSchema,
});

module.exports = mongoose.model("User", userSchema);
