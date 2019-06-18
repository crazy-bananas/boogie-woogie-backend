const mongoose = require("mongoose");
// const scores = new mongoose.Schema({
//   score: { type: Number },
//   user: { type: String }
// });

const userSchema = new mongoose.Schema({
  userId: { type: String, type: { unique: true } },
  email: { type: String },
  name: { type: String },
  nickname: { type: String },
  picture: { type: String },
  updated_at: { type: String }
});

//songSchema.set("autoIndex", false);
const UserCollection = mongoose.model("users", userSchema);

module.exports = { UserCollection };
