const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");
const User = require("./model");
var multer = require("multer");
var upload = multer();
var bodyParser = require("body-parser");

dotenv.config();
const app = express();
// for parsing multipart/form-data
app.use(upload.array());
app.use(express.static("public"));

mongoose.connect(process.env.MONGO_CONNECTION_STRING).then(() => {
  console.log("Connected to database");
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/user", async (req, res) => {
  const users = await User.find();
  res.send(users);
});

app.get("/test", function (req, res) {
  console.log("Version 1");
});

app.get("/", function (req, res) {
  res.send("Hello World!");
});

app.get("/create", async (req, res) => {
  return res.send(`
    <form method="POST" action="/user">
      <input name="name" />
      <button>Submit</button>
    </form>
  `);
});

app.post("/user", async (req, res) => {
  console.log(req.body);
  const users = await User.create({ name: req.body.name });
  res.redirect("/user");
});

app.get("/a", function (req, res) {
  res.send("a");
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
