require("dotenv").config();

const mongoconn = require("./database/mongoconn");
const express = require("express");
const app = express();

const userRouter = require("./user/userRouter");

// database connection
mongoconn();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server started on port 5000");
});

// Routers
app.use("/", userRouter);
