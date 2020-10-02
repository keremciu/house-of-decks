import express from "express";
import path, { dirname, parse } from "path";
import { fileURLToPath } from "url";
import http from "http";
import WebSocket from "ws";
import RoomService from "./RoomService";

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ noServer: true });
const port = process.env.PORT || 5000;

// eslint-disable-next-line no-console
const __dirname = dirname(fileURLToPath(import.meta.url));

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "/../client/build")));

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/../client/build/index.html"));
});

server.on("upgrade", function (request, socket, head) {
  console.log("Parsing data from request...");

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
      ws.send(
        JSON.stringify({
          game: game.getData(),
          player: game.findPlayer(username),
        })
      );
    } else {
      ws.send(
        JSON.stringify({
          action: "removesession",
        })
      );
    }
  }

  // broadcasting
  const broadcastRoom = (gameID, data) =>
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN && gameID === client.gameID) {
        client.send(data);
      }
    });

  ws.on("message", function (message) {
    const parsedMessage = JSON.parse(message);

    if (parsedMessage.action === "create_room") {
      const game = service.createRoom(parsedMessage.payload);
      ws.gameID = game.id;
      ws.username = parsedMessage.payload.username;

      ws.send(
        JSON.stringify({
          game: game.getData(),
          player: game.findPlayer(ws.username),
        })
      );
    }
    // console.log(`Received message ${parsedMessage} from user ${userId}`);
  });

  ws.on("close", function () {
    // map.delete(userId);
  });
});

server.listen(port, () => {
  console.log("Server listening at http://localhost:%d", port);
});
