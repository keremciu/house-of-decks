import Game from "./Game.js";
import Player from "./Player.js";
import { GAME_STAGES } from "../client/src/Game/mappings.js";

class RoomService {
  constructor(io, socket, games) {
    this.io = io;
    this.socket = socket;
    this._games = games;
    this.registerListeners();
  }

  registerListeners = () => {
    this.socket.on("create_room", this.createRoom);
    this.socket.on("join_room", this.joinRoom);
    this.socket.on("start_game", this.handleStartGame);
    this.socket.on("submit_card", this.handleSubmitCard);
    this.socket.on("submit_winner", this.handleSubmitWinner);
    this.socket.on("leave_room", this.leaveRoom);
    this.socket.on("disconnect", this.leaveRoom);
  };

  sendActionToRoom = (payload) => {
    this.io.in(this.room).emit("game_action", {
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
    this.socket.join(roomID, () => {
      this.room = roomID;
      this.username = data.username;
      const host = new Player(this.username);
      const game = new Game(this, roomID, host);
      this._games.set(roomID, game);
    });
  };

  joinRoom = (data) => {
    const { username, roomID } = data;
    if (!this.socket.adapter.rooms.hasOwnProperty(roomID)) {
      return this.sendError("There's no room found.");
    } else if (this.findGame(roomID).stage === GAME_STAGES.active) {
      return this.sendError("Game is already started in this room.");
    } else if (this.findGame(roomID).findPlayer(username)) {
      return this.sendError("Username is already taken for this room.");
    }
    this.socket.join(roomID, () => {
      this.room = roomID;
      this.username = username;
      const player = new Player(this.username);
      this.findGame(roomID).registerPlayer(player);
    });
  };

  findGame = (roomID) => this._games.get(roomID);

  checkSession = () => {
    if (!this.socket.adapter.rooms.hasOwnProperty(this.room)) {
      return this.sendError("Session is expired.", {
        room: { stage: GAME_STAGES.landing },
      });
    }
  };

  handleStartGame = () => {
    this.checkSession();
    if (this.findGame(this.room).players.length < 2) {
      return this.sendError("There's not enough players to start.");
    }
    this.findGame(this.room).start();
  };

  handleSubmitCard = (card) => {
    this.checkSession();
    this.findGame(this.room).submitCard(this.username, card);
  };

  handleSubmitWinner = (winner) => {
    this.checkSession();
    this.findGame(this.room).submitWinner(winner);
  };

  leaveRoom = (reason) => {
    console.log(reason, this.username);
    this.socket.leave(this.room);
    if (this._games.has(this.room)) {
      this.findGame(this.room).removePlayer(this.username);
    }
  };
}

export default RoomService;
