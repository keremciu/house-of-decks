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
    this.socket.on("nudge_room", this.nudgeRoom);
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

  nudgeRoom = () => {
    this.sendActionToRoom({
      runNudge: true,
      isNudgeReady: false,
    });
  };

  createRoom = (data) => {
    // note: we can move room id generation into client not sure about security
    let roomID = Math.random().toString(36).substring(8);
    if (this.socket.adapter.rooms.hasOwnProperty(roomID)) {
      roomID = Math.random().toString(36).substring(8);
    }
    this.socket.join(roomID, () => {
      this.socket.handshake.session.roomdata = roomID;
      this.socket.handshake.session.save();
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

  checkSession = (cb) => {
    if (
      (!this.socket.handshake.session.userdata &&
        !this.socket.adapter.rooms.hasOwnProperty(this.room)) ||
      !this._games.has(this.room)
    ) {
      return this.sendError("Session has expired.", {
        room: { stage: GAME_STAGES.landing },
      });
    } else {
      cb();
    }
  };

  handleStartGame = (data) => {
    this.checkSession(() => {
      if (this.findGame(this.room).players.length < 3) {
        return this.sendError(
          "There should be at least 3 players to start game."
        );
      }
      this.findGame(this.room).start(data);
    });
  };

  handleSubmitCard = (card) => {
    this.checkSession(() => {
      this.findGame(this.room).submitCard(this.username, card);
    });
  };

  handleSubmitWinner = (winner) => {
    this.checkSession(() => {
      this.findGame(this.room).submitWinner(winner);
    });
  };

  leaveRoom = (reason) => {
    console.log(reason, this.username);
    this.socket.leave(this.room);
    if (this._games.has(this.room)) {
      this.findGame(this.room).removePlayer(this.username);
      if (this.findGame(this.room).players.length === 0) {
        this._games.delete(this.room);
      } else {
        this.findGame(this.room).updateClients();
      }
    }
    this.socket.emit("game_action", {
      type: "NAH_SERVER_RESPONSE",
      payload: {},
    });
  };
}

export default RoomService;
