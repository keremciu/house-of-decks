import { WebSocket, Server } from "mock-socket";
import RoomService from "../../../server/RoomService";
import handlers from "../../../server/handlers";
const fakeURL = "ws://localhost";
const mockServer = new Server(fakeURL);

/*
 * By default the global WebSocket object is stubbed out. However,
 * if you need to stub something else out you can like so:
 */

window.WebSocket = WebSocket; // Here we stub out the window object

const games = new Map();
const service = new RoomService(games);

mockServer.on("connection", (ws) => {
  const broadcastRoom = (game) =>
    ws.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN && game.id === client.gameID) {
        client.send(
          JSON.stringify({
            game: game.getData(),
            player: game.findPlayer(client.username),
          })
        );
      }
    });
  ws.send(JSON.stringify({}));
  ws.on("message", (message) => {
    handlers({
      ws,
      service,
      broadcastRoom,
      message,
    });
  });
  ws.on("close", (reason) => {
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
