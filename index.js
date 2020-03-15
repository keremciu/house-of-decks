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
  socket.on("create_room", function(nickname, roomId) {
    rooms[roomId] = {
      roomId,
      players: [socket.id]
    };
    socket.nickname = nickname;
    socket.join(roomId, function() {
      io.to(`${roomId}`).emit("message", "You created a room");
      // socket.broadcast.in(roomId).emit("message", "eeeee5");
      console.log(socket.rooms, "list of rooms");
    });
  });

  socket.on("join_room", function(nickname, roomId) {
    rooms[roomId] = {
      roomId,
      players: [...(rooms[roomId] ? rooms[roomId].players : []), socket.id]
    };
    socket.nickname = nickname;
    socket.room = roomId;
    socket.join(roomId, function() {
      io.to(`${roomId}`).emit("message", "You join the room");
      // socket.broadcast.in(roomId).emit("message", "eeeee5");
      console.log(socket.rooms, "list of joined rooms");
      console.log(rooms);
    });
  });

  console.log("a user connected", socket.id);
  socket.on("disconnect", function() {
    console.log("user disconnected");
    socket.leave(socket.room);
    delete players[socket.id];
    io.emit("disconnect", socket.id);
  });
});

console.log(`Basic api listening on ${port}`);
