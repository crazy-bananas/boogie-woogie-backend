const expressServer = require("./server/server.js");
const { connectDb } = require("./server/models/userModel");
require("dotenv").config();

const PORT = process.env.PORT || 3000;

// expressServer.listen(PORT, () => console.log("server running at", PORT));

connectDb().then(async () => {
  expressServer.listen(PORT, () => {
    console.log(`App is runnning ${PORT}`);
  });
});
