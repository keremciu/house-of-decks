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

const rooms = {};

io.on("connection", function(socket) {
  // players[socket.id] = {
  //   playerId: socket.id
  // };
  // send the players object to the new player
  // socket.emit("currentPlayers", players);
  // // send the rooms object to the new player
  // socket.emit("currentPlayers", players);
  // update all other players of the new player
  // socket.broadcast.emit("newPlayer", players[socket.id]);
  socket.on("create_room", function(data) {
    const { roomID, username } = data;
    socket.nickname = username;
    rooms[roomID] = {
      id: roomID,
      players: [socket.nickname]
    };
    socket.join(roomID, function() {
      io.to(`${roomID}`).emit("game_action", {
        type: "NAH_SERVER_RESPONSE",
        payload: {
          error: "",
          stage: "waiting_room",
          room: rooms[roomID]
        }
      });
      socket.room = roomID;
      // var room = io.sockets.adapter.rooms[roomID];
      // console.log(room);
      // room.length;
      // socket.broadcast.in(roomID).emit("message", "eeeee5");
      // console.log(rooms, "rooms object");
      // console.log(socket.rooms, "list of rooms");
    });
  });

  socket.on("join_room", function(data) {
    const { roomID, username } = data;
    if (!rooms.hasOwnProperty(roomID)) {
      // there's no room error
      return socket.emit("game_action", {
        type: "NAH_SERVER_RESPONSE",
        payload: {
          error: "There's no room found."
        }
      });
    } else if (rooms[roomID].players.includes(username)) {
      // username is already in use for this room.
      return socket.emit("game_action", {
        type: "NAH_SERVER_RESPONSE",
        payload: {
          error: "Username is already in use for this room."
        }
      });
    }
    socket.nickname = username;
    rooms[roomID] = {
      id: roomID,
      players: [
        ...(rooms[roomID] ? rooms[roomID].players : []),
        socket.nickname
      ]
    };
    socket.join(roomID, function() {
      io.to(`${roomID}`).emit("game_action", {
        type: "NAH_SERVER_RESPONSE",
        payload: {
          error: "",
          stage: "waiting_room",
          room: rooms[roomID]
        }
      });
      socket.room = roomID;
    });
    // var room = io.sockets.adapter.rooms[roomID];
    // console.log(room);
    // console.log(socket.rooms, "list of joined rooms");
    // console.log(rooms);
  });

  console.log("a user connected", socket.id);
  socket.on("disconnect", function() {
    console.log("user disconnected");
    const roomID = socket.room;
    socket.leave(roomID);
    console.log(rooms);
    console.log(roomID, "leaveee");
    if (rooms.hasOwnProperty(roomID)) {
      rooms[roomID] = {
        players: rooms[roomID].players.filter(
          player => player !== socket.nickname
        )
      };
      console.log(socket.nickname);
      io.to(`${roomID}`).emit("game_action", {
        type: "NAH_SERVER_RESPONSE",
        payload: {
          room: rooms[roomID]
        }
      });
      console.log(rooms[roomID]);
    }
    // io.emit("disconnect", socket.id);
  });
});

console.log(`Basic api listening on ${port}`);
