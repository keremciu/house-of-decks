import express from "express";
import session from "express-session";
import path, { dirname, parse } from "path";
import { fileURLToPath } from "url";
import http from "http";
import WebSocket from "ws";
// import RoomService from "./RoomService.js";

//
// We need the same instance of the session parser in express and
// WebSocket server.
//
// const store = new session.MemoryStore({
//   reapInterval: 60000 * 10,
// });
const sessionParser = session({
  // store,
  saveUninitialized: false,
  secret: "$eCuRiTy",
  resave: false,
});

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ clientTracking: false, noServer: true });
const port = process.env.PORT || 5000;

// eslint-disable-next-line no-console
const __dirname = dirname(fileURLToPath(import.meta.url));

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "/../client/build")));

// apply session parser
app.use(sessionParser);

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/../client/build/index.html"));
});

server.on("upgrade", function (request, socket, head) {
  console.log("Parsing session from request...");

  // console.log(request);

  sessionParser(request, {}, () => {
    // if (!request.session.userId) {
    //   socket.write("HTTP/1.1 401 Unauthorized\r\n\r\n");
    //   socket.destroy();
    //   return;
    // }

    console.log("Session is parsed!", request.session.userId);

    wss.handleUpgrade(request, socket, head, function (ws) {
      wss.emit("connection", ws, request);
    });
  });
});

const map = new Map();

wss.on("connection", function (ws, request) {
  let userId;
  // const userId = request.session.userId;

  // map.set(userId, ws);

  console.log(request.session);

  ws.on("message", function (message) {
    const parsedMessage = JSON.parse(message);

    if (parsedMessage.action === "create_room") {
      // console.log(parsedMessage);
      userId = Math.random().toString(36).substring(8);
      map.set(userId, ws);
      request.session.userId = userId;
      request.session.username = parsedMessage.username;
      // request.session.save();
      request.session.save(function (err) {
        console.log(err, "problem here");
        // session saved
      });
      rx;
    }
    console.log(`Received message ${parsedMessage} from user ${userId}`);
  });

  ws.on("close", function () {
    map.delete(userId);
  });
});

server.listen(port, () => {
  console.log("Server listening at port %d", port);
});
