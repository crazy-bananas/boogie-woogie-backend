const mongoose = require("mongoose");
const scores = new mongoose.Schema({
  score: { type: Number },
  user: { type: String }
});

const scoreSchema = new mongoose.Schema({
  songId: { type: String },
  moveId: { type: String },
  scores: [{ type: scores }]
});
scoreSchema.index({ songId: 1, moveId: 1 }, { unique: true });

//songSchema.set("autoIndex", false);
const ScoreCollection = mongoose.model("scores", scoreSchema);

module.exports = { ScoreCollection };