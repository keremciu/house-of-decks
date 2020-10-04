import Game from "./Game.js";
import Player from "./Player.js";
import { GAME_STAGES } from "../client/src/Game/mappings.js";

class RoomService {
  constructor(games) {
    this._games = games;
  }

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

  createRoom = (payload) => {
    const host = new Player(payload.username);
    // note: we can move room id generation into client not sure about security
    let roomID = Math.random().toString(36).substring(8);
    if (this.findGame(roomID)) {
      roomID = Math.random().toString(36).substring(8); // TODO: recursive function of ID
    }
    const game = new Game(roomID, host);
    this._games.set(roomID, game);

    return game;
  };

  joinRoom = ({ username, roomID }) => {
    if (!this._games.get(roomID)) {
      return this.sendError("There's no room found.");
    } else if (this.findGame(roomID).findPlayer(username)) {
      return this.sendError("Username is already taken for this room.");
    }
    const game = this.findGame(roomID);
    const player = new Player(username);
    if (game.hasStarted) {
      player.isWaiting = true;
    }
    game.registerPlayer(player);

    return game;
  };

  findGame = (roomID) => this._games.get(roomID);

  checkSession = (cb) => {
    if (
      !this.socket.adapter.rooms.hasOwnProperty(this.room) ||
      !this._games.has(this.room)
    ) {
      return this.sendError("Session has expired.", {
        room: { stage: GAME_STAGES.landing },
      });
    } else {
      cb();
    }
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
