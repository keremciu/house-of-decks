import express from "express";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import http from "http";
import socketio from "socket.io";
import createsession from "express-session";
import sharedsession from "express-socket.io-session";

import RoomService from "./RoomService.js";

const app = express();
const server = http.createServer(app);
const io = socketio(server);
const port = process.env.PORT || 5000;
const session = createsession({
  secret: "my-secret",
  resave: true,
  saveUninitialized: true,
});

app.use(session);
io.set("transports", ["websocket"]);
io.use(sharedsession(session));

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
  const rooms = new Map();
  const games = new Map();
  io.on("connection", (socket) => {
    console.log("a user connected", socket.id);
    console.log(" %s sockets connected", io.engine.clientsCount);
    // if (socket.handshake.session.roomdata) {
    //   const room = this._rooms.get(socket.handshake.session.roomdata);
    //   console.log("test", socket.handshake.session.roomdata);
    // } else {
    //   const room = new RoomService(io, socket, games);
    //   this._rooms.set(roomID, room);
    // }
    const roomService = new RoomService(io, socket, games);

    if (socket.handshake.session.roomdata) {
      const roomID = socket.handshake.session.roomdata;
      socket.join(roomID);
      roomService.room = roomID;
    }

    // HANDLE DISCONNECT
    // Add the socket.id to our session.
    socket.handshake.session.userdata = socket.id;
    socket.handshake.session.save(function (err) {
      if (err) {
        console.log("ERR", err);
      }
    });

    socket.on("disconnect", function () {
      // Lets make sure that we do not kill off sessions for reloads or temp disconnect (network hickups)
      setTimeout(function () {
        socket.handshake.session.reload(function (err) {
          if (err) {
            console.log("ERR: ", err);
          }

          if (socket.id === socket.handshake.session.userdata) {
            // Full disconnect - destroy the session!
            console.log(socket.handshake.session, socket.id);
            socket.handshake.session.destroy(function (err) {
              if (err) {
                console.log("Could not destroy the session", err);
              }
            });
            // leave room
            roomService.leaveRoom();
          }
        });
      }, 5000);
    });
  });
  console.log("Server listening at port %d", port);
});
