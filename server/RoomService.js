import Room from "./Room.js";
import Player from "./Player.js";

class RoomService {
  constructor(io) {
    this.io = io;
    this.registerListeners(io);
    this._rooms = new Map();
  }

  registerListeners = (io) => {
    io.on("connection", (socket) => {
      this.socket = socket;
      socket.on("create_room", this.createRoom);
      socket.on("join_room", this.joinRoom);
      socket.on("start_game", this.startGame);
      socket.on("disconnect", function () {
        console.log("client disconnected");
      });
    });
  };

  sendActionToRoom = (payload) => {
    this.io.to(this.socket.room).emit("game_action", {
      type: "NAH_SERVER_RESPONSE",
      payload,
    });
  };

  sendAction = (payload) => {
    this.socket.emit("game_action", {
      type: "NAH_SERVER_RESPONSE",
      payload,
    });
  };

  createRoom = (data) => {
    // note: we can move room id generation into client not sure about security
    const roomID = Math.random().toString(36).substring(3);
    this.socket.join(roomID, () => {
      this.socket.nickname = data.username;
      this.socket.room = roomID;
      const host = new Player(this.socket.nickname);
      const room = new Room(this, roomID, host);
      this._rooms.set(roomID, room);
    });
  };

  joinRoom = (data) => {
    const { username, roomID } = data;
    if (!this._rooms.has(roomID)) {
      // there's no room error
      return this.sendAction({
        errors: ["There's no room found."],
      });
    } else if (this._rooms.get(roomID).status === "running") {
      // game is already started
      return this.sendAction({
        errors: ["Game is already started in this room."],
      });
    } else if (
      this._rooms.get(roomID).players.find((p) => p.username === username)
    ) {
      // username is already taken for this room.
      return this.sendAction({
        errors: ["Username is already taken for this room."],
      });
    }

    this.socket.join(roomID, () => {
      this.socket.nickname = username;
      this.socket.room = roomID;
      const player = new Player(this.socket.nickname);
      this._rooms.get(roomID).registerPlayer(player);
    });
  };

  startGame = () => {
    const roomID = this.socket.room;
    if (!roomID) {
      // there's no room for the socket
      return this.sendAction({
        stage: "landing",
        errors: ["Session is expired."],
      });
    }
    if (this._rooms.get(roomID).players.length < 2) {
      // there's not enough players in the room
      return this.sendAction({
        errors: ["There's not enough players to start."],
      });
    }
    this._rooms.get(roomID).start();
  };
}

export default RoomService;
