const mongoose = require("mongoose");
// const scores = new mongoose.Schema({
//   score: { type: Number },
//   user: { type: String }
// });

const scoreSchema = new mongoose.Schema({
  songId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "songs",
    autopopulate: true
  },
  moveId: { type: mongoose.Schema.Types.ObjectId, ref: "moves" },
  user: { type: String },
  score: { type: Number },
  pic: { type: String },
  userId: { type: String }
});
// scoreSchema.index({ songId: 1, moveId: 1 }, { unique: true });
scoreSchema.plugin(require("mongoose-autopopulate"));
//songSchema.set("autoIndex", false);
const ScoreCollection = mongoose.model("scores", scoreSchema);

module.exports = { ScoreCollection };
