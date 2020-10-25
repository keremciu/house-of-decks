import Game from "./Game.js";
import Player from "./Player.js";
import { GAME_STAGES } from "../client/src/Game/mappings.js";

class RoomService {
  constructor(games) {
    this._games = games;
  }

  // TODO: nudge functionality doesn't work
  nudgeRoom = () => {
    this.broadcastRoom({
      runNudge: true, // triggerNudge
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
      throw new Error("There is no room found.");
    } else if (this.findGame(roomID).findPlayer(username)) {
      throw new Error("Username is already taken for this room.");
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

  leaveRoom = ({ username, roomID }) => {
    if (this._games.has(roomID)) {
      const game = this.findGame(roomID);
      game.removePlayer(username);
      if (game.players.length === 0) {
        this._games.delete(roomID);
      }
      return game;
    }
  };
}

export default RoomService;
