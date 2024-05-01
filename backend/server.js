require("dotenv").config();

const mongoconn = require("./database/mongoconn");
const bodyParser = require("body-parser");
const express = require("express");
const cors = require("cors");
const app = express();

const userRouter = require("./user/userRouter");

// database connection
mongoconn();

// middlewares
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server started on port 5000");
});

// Routers
app.use("/", userRouter);
