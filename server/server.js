const express = require("express");
const { User } = require("./models/user");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  const unser = User.find();
  unser.then((data) => {
    console.log(data);
    res.send(data);
  });
});

app.post("/add", (req, res, next) => {
  const user = new User({
    name: req.body.name
  }).save((err) => {
    if (err) return next(err);
    res.redirect("/");
  });
});

module.exports = app;
