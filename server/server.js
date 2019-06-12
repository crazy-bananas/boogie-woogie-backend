const express = require("express");
var bodyParser = require("body-parser");
const { SongCollection } = require("./models/songs");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.get("api/songs", (req, res) => {
  const songs = SongCollection.find();
  songs.then(data => {
    res.send(data);
  });
});
function isValidSongData(title, artist, url) {
  return title && artist && url;
}

app.post("api/songs", (req, res, next) => {
  const { title, artist, url } = req.body;

  if (!isValidSongData(title, artist, url)) {
    res.send("Invalid song data");
  }

  const newSong = new SongCollection({
    title,
    artist,
    url
  }).save((err, song) => {
    if (err) {
      return next(err);
    }

    res.send(song);
  });
});

app.get("api/songs/:titleOrArtist", (req, res, next) => {
  const songs = SongCollection.find({
    $or: [
      {
        title: {
          $regex: new RegExp("^" + req.params.titleOrArtist.toLowerCase(), "i")
        }
      },
      {
        artist: {
          $regex: new RegExp("^" + req.params.titleOrArtist.toLowerCase(), "i")
        }
      }
    ]
  });

  songs
    .then(foundSongs => {
      res.send(foundSongs);
    })
    .catch(err => {
      next(err);
    });
});

app.get("api/songs/:title/:artist/", (req, res, next) => {
  const { title, artist } = req.params;
  const song = SongCollection.find({
    title: {
      $regex: new RegExp("^" + title.toLowerCase(), "i")
    },
    artist: {
      $regex: new RegExp("^" + artist.toLowerCase(), "i")
    }
  });
  song
    .then(foundSong => {
      res.send(foundSong);
    })
    .catch(err => {
      next(err);
    });
});

app.use((err, req, res) => {
  res.send("Something broke");
});

module.exports = app;
