const express = require("express");
const path = require("path");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const port = process.env.PORT || 5000;
const cards = require("./data.json");

server.listen(port);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "client/build")));

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

const rooms = {};
const filteredWhiteCards = cards.white
  .filter(card => card.deck === "Base")
  .sort(() => Math.random() - 0.5);
const filteredBlackCards = cards.black
  .filter(card => card.deck === "Base")
  .sort(() => Math.random() - 0.5);

io.on("connection", function(socket) {
  socket.on("create_room", function(data) {
    const { username } = data;
    const roomID = Math.random()
      .toString(36)
      .substring(3);
    socket.nickname = username;
    rooms[roomID] = {
      id: roomID,
      status: "waiting",
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
    } else if (rooms[roomID].status === "running") {
      // game is already started
      return socket.emit("game_action", {
        type: "NAH_SERVER_RESPONSE",
        payload: {
          error: "Game is already started in this room."
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
      ...rooms[roomID],
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
  });

  socket.on("start_game", function() {
    const roomID = socket.room;
    rooms[roomID] = {
      ...rooms[roomID],
      status: "running"
    };
    const czarIndex = Math.floor(Math.random() * rooms[roomID].players.length);
    rooms[roomID].czar = rooms[roomID].players[czarIndex];
    rooms[roomID].players.forEach(player => {
      rooms[roomID].playerCards = {
        ...rooms[roomID].playerCards,
        [player]: filteredWhiteCards.splice(-10, 10)
      };
      rooms[roomID].playedCards = {
        [player]: []
      };
      if (rooms[roomID].czar !== player) {
        rooms[roomID].playersSubmitted = {
          ...rooms[roomID].playersSubmitted,
          [player]: false
        };
      }
    });
    rooms[roomID].blackCard = filteredBlackCards.pop();
    io.to(`${roomID}`).emit("game_action", {
      type: "NAH_SERVER_RESPONSE",
      payload: {
        stage: "active_room",
        room: rooms[roomID]
      }
    });
  });

  socket.on("submit_card", function(card) {
    const roomID = socket.room;
    const player = socket.nickname;
    const playedCards = {
      ...rooms[roomID].playedCards,
      [player]: [...rooms[roomID].playedCards[player], card]
    };
    const userPlayed =
      rooms[roomID].blackCard.pick === playedCards[player].length;
    rooms[roomID] = {
      ...rooms[roomID],
      playedCards,
      playersSubmitted: {
        [player]: userPlayed
      }
    };

    io.to(`${roomID}`).emit("game_action", {
      type: "NAH_SERVER_RESPONSE",
      payload: {
        room: rooms[roomID]
      }
    });
  });

  console.log("a user connected", socket.id);
  socket.on("disconnect", function() {
    console.log("user disconnected");
    const roomID = socket.room;
    socket.leave(roomID);
    if (rooms.hasOwnProperty(roomID)) {
      rooms[roomID] = {
        players: rooms[roomID].players.filter(
          player => player !== socket.nickname
        )
      };
      io.to(`${roomID}`).emit("game_action", {
        type: "NAH_SERVER_RESPONSE",
        payload: {
          room: rooms[roomID]
        }
      });
    }
  });
});

console.log(`Basic api listening on ${port}`);
