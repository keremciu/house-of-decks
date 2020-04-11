class RoomService {
  constructor(io) {
    this.io = io;
    this.registerListener(io);

    this._rooms = new Map();
  }

  registerListener = (io) => {
    io.on("connection", (socket) => {
      this.socket = socket;
      socket.on("create_room", this.createRoom);
      socket.on("join_room", this.joinRoom);
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
    const { username } = data;
    const roomID = Math.random().toString(36).substring(3);
    this.socket.nickname = username;
    this.socket.join(roomID, () => {
      this.socket.room = roomID;
      this._rooms.set(roomID, {
        id: roomID,
        status: "waiting",
        players: [this.socket.nickname],
      });
      this.sendActionToRoom({
        stage: "waiting_room",
        room: this._rooms.get(roomID),
      });
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
    } else if (this._rooms.get(roomID).players.includes(username)) {
      // username is already taken for this room.
      return this.sendAction({
        errors: ["Username is already taken for this room."],
      });
    }

    this.socket.nickname = username;
    this.socket.join(roomID, () => {
      this.socket.room = roomID;
      this._rooms.set(roomID, {
        players: [this.socket.nickname],
      });
      this.sendActionToRoom({
        stage: "waiting_room",
        room: this._rooms.get(roomID),
      });
    });
  };
}

export default RoomService;
