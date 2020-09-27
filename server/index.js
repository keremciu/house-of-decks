import express from "express";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import http from "http";
// import RoomService from "./RoomService.js";

const app = express();
const server = http.createServer(app);
// const io = socketio(server);
// io.set("transports", ["websocket"]);
const port = process.env.PORT || 5000;

// eslint-disable-next-line no-console
const __dirname = dirname(fileURLToPath(import.meta.url));

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "../client/build")));

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "../client/build/index.html"));
});

server.listen(port, () => {
  const games = new Map();
  // io.on("connect", (socket) => {
  //   console.log("a user connected", socket.id);
  //   new RoomService(io, socket, games);
  // });
  console.log("Server listening at port %d", port);
});
