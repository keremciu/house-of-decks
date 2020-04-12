import { GAME_STAGES } from "../client/src/Game/mappings.js";
import cards from "./data.json";

const filteredBlackCards = cards.black
  .filter((card) => card.deck === "Base")
  .sort(() => Math.random() - 0.5);

class Room {
  constructor(service, roomID, host) {
    this.service = service;
    this.id = roomID;
    this.stage = GAME_STAGES.waiting;
    this.players = [host];
    this.isReadyToJudge = false;
    this.updateClients();
  }

  updateClients = () => {
    // omit this.service from room object
    const { service, ...room } = this;
    this.service.sendActionToRoom({
      room,
    });
  };

  registerPlayer = (player) => {
    this.players.push(player);
    this.updateClients();
  };

  start = () => {
    const czarIndex = Math.floor(Math.random() * this.players.length);
    this.czar = this.players[czarIndex].username;
    this.stage = GAME_STAGES.active;
    this.blackCard = filteredBlackCards.pop();
    this.updateClients();
  };

  check = () => {};
}

export default Room;
