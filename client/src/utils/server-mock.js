import { WebSocket, Server } from "mock-socket";
import RoomService from "../../../server/RoomService";
import handlers from "../../../server/handlers";
const fakeURL = "ws://localhost:5000";
const mockServer = new Server(fakeURL);

/*
 * By default the global WebSocket object is stubbed out. However,
 * if you need to stub something else out you can like so:
 */
window.WebSocket = WebSocket; // Here we stub out the window object
const gameHostSocket = new window.WebSocket("ws://localhost:5000");
gameHostSocket.send(
  JSON.stringify({
    action: "create",
    payload: {
      username: "host-user",
    },
  })
);
const onMessage = async (event) => {
  const data = JSON.parse(event.data);
  window.testGameID = data.game?.id;
};
gameHostSocket?.addEventListener("message", onMessage);

const games = new Map();
const service = new RoomService(games);

mockServer.on("connection", (ws) => {
  const broadcastRoom = (game) => {
    mockServer.clients().forEach((client) => {
      if (client.readyState === WebSocket.OPEN && game.id === client.gameID) {
        client.dispatchEvent({
          type: "message",
          data: JSON.stringify({
            game: game.getData(),
            player: game.findPlayer(client.username),
          }),
        });
      }
    });
  };
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
