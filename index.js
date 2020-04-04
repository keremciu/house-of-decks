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
  socket.on("create_room", function(data) {
    const { roomID, username } = data;
    rooms[roomID] = {
      roomID,
      players: [socket.id]
    };
    socket.nickname = username;
    socket.join(roomID, function() {
      io.to(`${roomID}`).emit("game_action", {
        type: "NAH_SERVER_RESPONSE",
        payload: {
          stage: "waiting_room"
        }
      });
      // socket.broadcast.in(roomID).emit("message", "eeeee5");
      console.log(socket.rooms, "list of rooms");
    });
  });

  socket.on("join_room", function(data) {
    console.log(data, "amaaan");
    const { roomID, username } = data;
    if (!rooms.hasOwnProperty(roomID)) {
      // there's no room
      socket.emit("currentPlayers", players);
    }

    rooms[roomID] = {
      roomID,
      players: [...(rooms[roomID] ? rooms[roomID].players : []), socket.id]
    };
    socket.nickname = username;
    socket.room = roomID;
    socket.join(roomID, function() {
      io.to(`${roomID}`).emit("game_action", {
        type: "NAH_SERVER_RESPONSE",
        payload: {
          stage: "waiting_room"
        }
      });
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
