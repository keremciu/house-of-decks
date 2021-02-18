import express from "express";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import http from "http";
import WebSocket from "ws";
import RoomService from "./RoomService";
import handlers from "./handlers";

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ noServer: true });
const port = process.env.PORT || 5000;

const sourceDir = dirname(fileURLToPath(import.meta.url));

// Serve static files from the React app
app.use(express.static(path.join(sourceDir, "/../client/build")));

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get("*", (req, res) => {
  res.sendFile(path.join(sourceDir + "/../client/build/index.html"));
});

server.on("upgrade", function (request, socket, head) {
  wss.handleUpgrade(request, socket, head, function (ws) {
    wss.emit("connection", ws, request);
  });
});

const games = new Map();
const service = new RoomService(games);

wss.on("connection", function (ws, request) {
  const url = new URL(request.url, "http://localhost:5000"); // this url should come from env variables
  const gameID = url.searchParams.get("gameID");
  const username = url.searchParams.get("username");

  // if there is data in our RoomService send it to the user
  if (gameID) {
    if (service.findGame(gameID)) {
      const game = service.findGame(gameID);
      ws.gameID = game.id;
      ws.username = username;
      ws.send(
        JSON.stringify({
          game: game.getData(),
          player: game.findPlayer(username),
        })
      );
    } else {
      ws.send(JSON.stringify({}));
    }
  } else {
    // ws.send(JSON.stringify({}));
  }

  // broadcasting
  const broadcastRoom = (game) =>
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN && game.id === client.gameID) {
        client.send(
          JSON.stringify({
            game: game.getData(),
            player: game.findPlayer(client.username),
          })
        );
      }
    });

  ws.on("message", function (message) {
    handlers({
      ws,
      service,
      broadcastRoom,
      message,
    });
  });

  // check if process goest
  console.log(ws.isAlive);

  ws.on("close", function () {
    // find a way to handle not connected websocket issue
  });
});

server.listen(port, () => {
  console.log("Server listening at http://localhost:%d", port);
});

["SIGINT", "SIGTERM"].forEach(function (sig) {
  process.on(sig, function () {
    console.log("SIGTERM signal received: closing HTTP server");
    server.close(() => {
      console.log("HTTP server closed");
    });
    process.exit();
  });
});
