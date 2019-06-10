const express = require("express");
const { SongCollection } = require("./models/songs");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  const user = SongCollection.find();
  user.then((data) => {
    res.send(data);
  });
});
function isValidSongData(title, artist, url) {
  return title && artist && url;
}

app.post("/songs", (req, res, next) => {
  const { title, artist, url } = req.body;

  if (!isValidSongData(title, artist, url)) {
    res.status(400).send("Invalid song data");
  }

  const newSong = new SongCollection({
    title,
    artist,
    url
  }).save((err) => {
    if (err) return next(err);
    res.redirect("/");
  });
});

module.exports = app;
