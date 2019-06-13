const express = require("express");
var bodyParser = require("body-parser");
const { SongCollection } = require("./models/songs");
const { MoveCollection } = require("./models/moves");
const { ScoreCollection } = require("./models/scores");
var cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

app.get("/api/songs", (req, res, next) => {
  const songs = SongCollection.find();
  songs.then(data => {
    res.send(data);
  });
});

function isValidSongData(title, artist, url) {
  return title && artist && url;
}

app.post("/api/songs", (req, res, next) => {
  const { title, artist, code } = req.body;

  if (!isValidSongData(title, artist, code)) {
    res.send("Invalid song data");
  }
  const newSong = new SongCollection({
    title,
    artist,
    code
  }).save((err, song) => {
    if (err) {
      return next(err);
    }
    res.send(song);
  });
});

app.get("/api/songs/:titleOrArtist", (req, res, next) => {
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

app.get("/api/songs/:title/:artist/", (req, res, next) => {
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

app.get("/api/moves/:songcode", (req, res, next) => {
  const moves = MoveCollection.find({ songcode: req.params.songcode });
  moves
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      next(err);
    });
});

function isValidMoveData(songcode, moves, name) {
  return songcode && moves && name;
}

app.post("/api/moves", (req, res, next) => {
  const { songcode, moves, name } = req.body;

  if (!isValidMoveData(songcode, moves, name)) {
    res.send("Invalid move data");
  }
  const newMove = new MoveCollection({
    songcode,
    moves,
    name
  }).save((err, move) => {
    if (err) {
      return next(err);
    }
    res.send(move);
  });
});

// app.use((err, req, res) => {
//   res.send("Something broke");
// });

module.exports = app;
