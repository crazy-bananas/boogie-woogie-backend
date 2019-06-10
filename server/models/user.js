const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, unique: true }
});

const User = mongoose.model("boogie", userSchema, "user");

module.exports = { User };
