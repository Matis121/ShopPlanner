const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxLength: 150,
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
  name: {
    type: String,
    maxLength: 30,
  },
  description: {
    type: String,
    maxLength: 120,
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
  productList: [productSchema],
});

const groupInvitationSchema = new mongoose.Schema({
  groupId: {
    type: String,
    required: true,
  },
  groupName: {
    type: String,
    required: true,
  },
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
  groupInvitations: {
    type: [groupInvitationSchema],
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

const groupUserSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["invited", "active"],
    required: true,
  },
  role: {
    type: String,
    default: "user",
    required: true,
  },
});

const groupSchema = new mongoose.Schema({
  name: {
    type: String,
    maxLength: 50,
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
  users: [groupUserSchema],
  lists: [listSchema],
});

const Group = mongoose.model("Group", groupSchema);
const User = mongoose.model("User", userSchema);
const List = mongoose.model("List", listSchema);
const GroupUser = mongoose.model("GroupUser", groupUserSchema);

module.exports = { GroupUser, Group, User, List };
