const express = require("express");
var bodyParser = require("body-parser");

const ObjectId = require("mongoose").Types.ObjectId;
const { SongCollection } = require("./models/songs");
const { MoveCollection } = require("./models/moves");
const { ScoreCollection } = require("./models/scores");
const { UserCollection } = require("./models/users");
const request = require("request");
var cors = require("cors");
require("dotenv").config();

const app = express();

app.use(express.json({ limit: "50mb" }));

app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000
  })
);

app.use(cors());

app.get("/api/songs", (req, res, next) => {
  const songs = SongCollection.find();
  songs.then(data => {
    res.send(data);
  });
});

function isValidSongData(title, url) {
  return title && url;
}

app.post("/api/songs", (req, res, next) => {
  const { title, code } = req.body;

  if (!isValidSongData(title, code)) {
    res.send("Invalid song data");
  }
  const newSong = new SongCollection({
    title,

    code
  }).save((err, song) => {
    if (err) {
      return next(err);
    }
    res.send(song);
  });
});

app.get("/api/songs/:titleOrCode", (req, res, next) => {
  const songs = SongCollection.find({
    $or: [
      {
        title: {
          $regex: new RegExp("^" + req.params.titleOrCode.toLowerCase(), "i")
        }
      },

      {
        code: {
          $regex: new RegExp("^" + req.params.titleOrCode.toLowerCase(), "i")
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

// app.get("/api/songs/:title/:artist/", (req, res, next) => {
//   const { title, artist } = req.params;
//   const song = SongCollection.find({
//     title: {
//       $regex: new RegExp("^" + title.toLowerCase(), "i")
//     },
//     artist: {
//       $regex: new RegExp("^" + artist.toLowerCase(), "i")
//     }
//   });
//   song
//     .then(foundSong => {
//       res.send(foundSong);
//     })
//     .catch(err => {
//       next(err);
//     });
// });

app.get("/api/moves/:songcodeOrMoveid", (req, res, next) => {
  let moves;
  if (req.params.songcodeOrMoveid.length < 12) {
    moves = MoveCollection.find({
      songcode: req.params.songcodeOrMoveid
    });
  } else {
    moves = MoveCollection.find({
      _id: req.params.songcodeOrMoveid
    });
  }
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
  console.log(" moves");
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

app.post("/api/scores", (req, res, next) => {
  const { songId, moveId, score, user, pic, userId } = req.body;

  const newScore = new ScoreCollection({
    songId,
    moveId,
    score,
    user,
    pic,
    userId
  }).save((err, score) => {
    if (err) {
      return next(err);
    }
    res.send(score);
  });
});

app.get("/api/scores/:songId/:moveId", (req, res, next) => {
  const moves = ScoreCollection.find({
    songId: req.params.songId,
    moveId: req.params.moveId
  });
  moves
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      next(err);
    });
});

app.get("/api/scores/:userId", (req, res, next) => {
  const scoreData = ScoreCollection.find({
    userId: req.params.userId
  });
  scoreData
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      next(err);
    });
});

app.post("/api/users", (req, res, next) => {
  const { userId, email, name, nickname, picture, updated_at } = req.body;

  const newUser = new UserCollection({
    userId,
    email,
    name,
    nickname,
    picture,
    updated_at
  }).save((err, user) => {
    if (err) {
      return next(err);
    }
    res.send(user);
  });
});

const MGMT_API_ACCESS_TOKEN = process.env.MGMT_API_ACCESS_TOKEN;
const AUTH_DOMAIN = process.env.AUTH_DOMAIN;

app.get("/api/users/:userID", async (req, res, next) => {
  const { userID } = req.params;

  const options = {
    method: "GET",
    url: `https://${AUTH_DOMAIN}/api/v2/users/${userID}`,
    headers: { authorization: `Bearer ${MGMT_API_ACCESS_TOKEN}` }
  };

  request(options, function(error, response, body) {
    if (error) {
      return next(err);
    }

    res.send(body);
  });
});

// app.use((err, req, res) => {
//   res.send("Something broke");
// });

module.exports = app;
