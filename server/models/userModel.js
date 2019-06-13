const mongoose = require("mongoose");
const { SongCollection } = require("./songs");
const { MoveCollection } = require("./moves");
const { ScoreCollection } = require("./scores");
require("dotenv").config();

const COLLECTION_NAME_SONGS = process.env.COLLECTION_NAME_SONGS || "boogie";
const DB_USER_NAME = process.env.DB_USER_NAME;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_URL = process.env.DB_URL || "boogie-u1a2t.mongodb.net";

const connectDb = () => {
  return mongoose.connect(
    `mongodb+srv://${DB_USER_NAME}:${DB_PASSWORD}@boogie-u1a2t.mongodb.net/boogie?retryWrites=true&w=majority`,
    {
      useCreateIndex: true,
      useNewUrlParser: true
    }
  );
};
let db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

const models = {
  SongCollection,
  MoveCollection,
  ScoreCollection
};

module.exports = { models, connectDb };
