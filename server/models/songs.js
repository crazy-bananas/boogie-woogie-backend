const mongoose = require("mongoose");

const songSchema = new mongoose.Schema({
  title: { type: String },

  code: { type: String, unique: true }
});

//songSchema.set("autoIndex", false);
const SongCollection = mongoose.model("songs", songSchema);

module.exports = { SongCollection };
