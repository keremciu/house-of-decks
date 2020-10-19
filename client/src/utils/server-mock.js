import { Server } from "mock-socket";
const fakeURL = "ws://localhost";
const mockServer = new Server(fakeURL);

mockServer.on("connection", (socket) => {
  socket.send(JSON.stringify({}));
  socket.on("message", (data) => {
    socket.send(JSON.stringify({}));
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
