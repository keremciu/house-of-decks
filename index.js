const express = require("express");
const path = require("path");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const port = process.env.PORT || 5000;

server.listen(port);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "client/build")));

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

const players = {};
const rooms = {};

io.on("connection", function(socket) {
  players[socket.id] = {
    playerId: socket.id
  };
  // send the players object to the new player
  socket.emit("currentPlayers", players);
  // // send the rooms object to the new player
  // socket.emit("currentPlayers", players);
  // update all other players of the new player
  socket.broadcast.emit("newPlayer", players[socket.id]);

  // socket.join("some room");
  // console.log("asfasfs");
  socket.on("create_room", function(roomId) {
    console.log("room_created:", roomId);
    rooms[roomId] = {
      roomId,
      players: [socket.id]
    };
    socket.join(roomId);
    socket.broadcast.to(roomId).emit("message", "eeeee");
  });

  console.log("a user connected");
  socket.on("disconnect", function() {
    console.log("user disconnected");
    delete players[socket.id];
    io.emit("disconnect", socket.id);
  });
});

console.log(`Basic api listening on ${port}`);
