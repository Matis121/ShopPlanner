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
  lists: [listSchema],
});

module.exports = mongoose.model("Product", productSchema);
module.exports = mongoose.model("List", listSchema);
module.exports = mongoose.model("User", userSchema);
