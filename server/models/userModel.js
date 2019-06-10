const mongoose = require("mongoose");
const { SongCollection } = require("./songs");
require("dotenv").config();

const COLLECTION = process.env.COLLECTION_NAME || "boogie";
const USER_NAME = process.env.DB_USER_NAME;
const DB_PASSWORD = process.env.DB_PASSWORD;

const connectDb = () => {
  return mongoose.connect(
    `mongodb+srv://${USER_NAME}:${DB_PASSWORD}@boogie-u1a2t.mongodb.net/${COLLECTION}?retryWrites=true&w=majority`,
    {
      useCreateIndex: true,
      useNewUrlParser: true
    }
  );
};

const models = {
  SongCollection
};

module.exports = { models, connectDb };
