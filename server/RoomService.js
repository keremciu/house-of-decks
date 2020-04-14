import Game from "./Game.js";
import Player from "./Player.js";
import { GAME_STAGES } from "../client/src/Game/mappings.js";

class RoomService {
  constructor(io) {
    this.io = io;
    this.registerListeners(io);
    this._games = new Map();
  }

  registerListeners = (io) => {
    io.on("connection", (socket) => {
      this.socket = socket;
      console.log("a user connected", socket.id);
      socket.on("create_room", this.createRoom);
      socket.on("join_room", this.joinRoom);
      socket.on("start_game", this.handleStartGame);
      socket.on("submit_card", this.handleSubmitCard);
      socket.on("submit_winner", this.handleSubmitWinner);
      socket.on("leave_room", this.leaveRoom);
      socket.on("disconnect", this.leaveRoom);
    });
  };

  sendActionToRoom = (payload) => {
    this.io.to(this.socket.room).emit("game_action", {
      type: "NAH_SERVER_RESPONSE",
      payload,
    });
  };

  sendError = (error, payload = {}) => {
    this.socket.emit("game_action", {
      type: "NAH_SERVER_RESPONSE",
      payload: {
        errors: [error],
        ...payload,
      },
    });
  };

  createRoom = (data) => {
    // note: we can move room id generation into client not sure about security
    const roomID = Math.random().toString(36).substring(3);
    this.socket.room = roomID;
    this.socket.join(roomID, () => {
      this.socket.nickname = data.username;
      const host = new Player(this.socket.nickname);
      const game = new Game(this, roomID, host);
      this._games.set(roomID, game);
    });
  };

  joinRoom = (data) => {
    const { username, roomID } = data;
    if (!this._games.has(roomID)) {
      return this.sendError("There's no room found.");
    } else if (this.findGame(roomID).stage === GAME_STAGES.active) {
      return this.sendError("Game is already started in this room.");
    } else if (this.findGame(roomID).findPlayer(username)) {
      return this.sendError("Username is already taken for this room.");
    }
    this.socket.room = roomID;
    this.socket.join(roomID, () => {
      this.socket.nickname = username;
      const player = new Player(this.socket.nickname);
      this.findGame(roomID).registerPlayer(player);
    });
  };

  findGame = (roomID) => this._games.get(roomID);

  handleStartGame = () => {
    const { room } = this.socket;
    if (!room) {
      return this.sendError("Session is expired.", {
        room: { stage: GAME_STAGES.landing },
      });
    } else if (this.findGame(room).players.length < 2) {
      return this.sendError("There's not enough players to start.");
    }
    this.findGame(room).start();
  };

  handleSubmitCard = (card) => {
    const { nickname, room } = this.socket;
    this.findGame(room).submitCard(nickname, card);
  };

  handleSubmitWinner = (winner) => {
    const { room } = this.socket;
    this.findGame(room).submitWinner(winner);
  };

  leaveRoom = (reason) => {
    console.log(reason);
    const roomID = this.socket.room;
    this.socket.leave(roomID);
    if (this._games.has(roomID)) {
      this.findGame(roomID).removePlayer(this.socket.nickname);
    }
  };
}

export default RoomService;
