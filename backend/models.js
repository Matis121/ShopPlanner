const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    default: 1,
  },
  isCollected: {
    type: Boolean,
    default: false,
  },
});

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
  productList: [productSchema],
});

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  lists: {
    type: [listSchema],
    required: false,
  },
  groups: {
    type: Array,
    required: false,
  },
  createdAt: {
    type: Date,
    immutable: true,
    default: () => Date.now(),
  },
  updatedAt: {
    type: Date,
    default: () => Date.now(),
  },
});

const groupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    immutable: true,
    default: () => Date.now(),
  },
  updatedAt: {
    type: Date,
    default: () => Date.now(),
  },
  users: Array,
  lists: [listSchema],
});

const Group = mongoose.model("Group", groupSchema);
const User = mongoose.model("User", userSchema);
const List = mongoose.model("List", listSchema);

module.exports = { Group, User, List };
