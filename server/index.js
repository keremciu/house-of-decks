import express from "express";
import path, { dirname, parse } from "path";
import { fileURLToPath } from "url";
import http from "http";
import WebSocket from "ws";
// import RoomService from "./RoomService.js";

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ clientTracking: false, noServer: true });
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

const map = new Map();

wss.on("connection", function (ws, request) {
  const url = new URL(request.url, "http://localhost:5000");
  const gameID = url.searchParams.get("gameID");
  const playerID = url.searchParams.get("playerID");

  ws.send(playerID);

  ws.on("message", function (message) {
    const parsedMessage = JSON.parse(message);

    if (parsedMessage.action === "create_room") {
      // console.log(parsedMessage);
      // const userId = Math.random().toString(36).substring(8);
    }
    console.log(parsedMessage);
    // console.log(`Received message ${parsedMessage} from user ${userId}`);
  });

  ws.on("close", function () {
    // map.delete(userId);
  });
});

server.listen(port, () => {
  console.log("Server listening at http://localhost:%d", port);
});
