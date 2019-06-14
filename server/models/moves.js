const mongoose = require("mongoose");

const bodyPart = new mongoose.Schema({
  x: { type: Number },
  y: { type: Number },
  score: { type: Number }
});
const singleMoveSchema = new mongoose.Schema({
  leftAnkle: { type: bodyPart },
  rightAnkle: { type: bodyPart },
  nose: { type: bodyPart },
  rightEye: { type: bodyPart },
  leftEye: { type: bodyPart },
  leftEar: { type: bodyPart },
  rightEar: { type: bodyPart },
  leftShoulder: { type: bodyPart },
  rightShoulder: { type: bodyPart },
  rightElbow: { type: bodyPart },
  leftWrist: { type: bodyPart },
  rightWrist: { type: bodyPart },
  leftHip: { type: bodyPart },
  rightHip: { type: bodyPart },
  leftKnee: { type: bodyPart },
  rightKnee: { type: bodyPart },
  leftElbow: { type: bodyPart }
});

const movesSchema = new mongoose.Schema({
  songcode: { type: String },
  moves: [{ type: singleMoveSchema }],
  name: { type: String, unique: true }
});

//songSchema.set("autoIndex", false);
const MoveCollection = mongoose.model("moves", movesSchema);

module.exports = { MoveCollection };
