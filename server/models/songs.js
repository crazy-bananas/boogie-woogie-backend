const mongoose = require("mongoose");

const songSchema = new mongoose.Schema({
  title: { type: String },
  artist: { type: String },
  url: { type: String, unique: true }
});

const SongCollection = mongoose.model("boogie", songSchema, "songs");

module.exports = { SongCollection };
