import { WebSocket, Server } from "mock-socket";
import RoomService from "../../../server/RoomService";
const fakeURL = "ws://localhost";
const mockServer = new Server(fakeURL);

/*
 * By default the global WebSocket object is stubbed out. However,
 * if you need to stub something else out you can like so:
 */

window.WebSocket = WebSocket; // Here we stub out the window object

const games = new Map();
const service = new RoomService(games);

mockServer.on("connection", (socket) => {
  socket.send(JSON.stringify({}));
  socket.on("message", (message) => {
    let game;
    const parsedMessage = JSON.parse(message);
    if (parsedMessage.action === "create") {
      game = service.createRoom(parsedMessage.payload);
      socket.gameID = game.id;
      socket.username = parsedMessage.payload.username;
      socket.send(
        JSON.stringify({
          game: game.getData(),
          player: game.findPlayer(socket.username),
        })
      );
    }
    // socket.send(JSON.stringify({}));
  });
  socket.on("close", (reason) => {
    console.log(reason, "noldu yaa");
  });
});

// deal with jsdom issue
window.HTMLMediaElement.prototype.load = () => {
  /* do nothing */
};
window.HTMLMediaElement.prototype.play = () => {
  /* do nothing */
};
window.HTMLMediaElement.prototype.pause = () => {
  /* do nothing */
};
window.HTMLMediaElement.prototype.addTextTrack = () => {
  /* do nothing */
};
