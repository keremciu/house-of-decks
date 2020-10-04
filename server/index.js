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
    let game;
    const parsedMessage = JSON.parse(message);

    try {
      if (parsedMessage.action === "create") {
        game = service.createRoom(parsedMessage.payload);
        ws.gameID = game.id;
        ws.username = parsedMessage.payload.username;
        ws.send(
          JSON.stringify({
            game: game.getData(),
            player: game.findPlayer(ws.username),
          })
        );
        return;
      }

      if (parsedMessage.action === "join") {
        game = service.joinRoom(parsedMessage.payload);
        ws.gameID = game.id;
        ws.username = parsedMessage.payload.username;
        broadcastRoom(game);
        return;
      }

      if (parsedMessage.action === "start") {
        game = service.findGame(ws.gameID);
        game.start(parsedMessage.payload);
        broadcastRoom(game);
        return;
      }

      if (parsedMessage.action === "submit_card") {
        game = service.findGame(ws.gameID);
        game.submitCard(ws.username, parsedMessage.payload);
        broadcastRoom(game);
        return;
      }

      if (parsedMessage.action === "submit_winner") {
        game = service.findGame(ws.gameID);
        game.submitWinner(ws.username, parsedMessage.payload);
        broadcastRoom(game);
        return;
      }
    } catch (error) {
      ws.send(
        JSON.stringify({
          errors: [error.message],
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
