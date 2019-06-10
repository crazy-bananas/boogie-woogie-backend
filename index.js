const expressServer = require("./server/server.js");
const PORT = process.env.PORT || 3000;
expressServer.listen(PORT, () => console.log("server running at", PORT));
