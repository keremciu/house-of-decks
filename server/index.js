import express from "express";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import http from "http";
import socketio from "socket.io";
import RoomService from "./RoomService.js";

const app = express();
const server = http.Server(app);
const port = process.env.PORT || 5000;
server.listen(port);
const io = socketio(server);

const __dirname = dirname(fileURLToPath(import.meta.url));

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "../client/build")));

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "../client/build/index.html"));
});

new RoomService(io);

console.log(`Server listening on ${port}`);
