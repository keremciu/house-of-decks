import { GAME_STAGES } from "../client/src/Game/mappings.js";

class Room {
  constructor(service, roomID, host) {
    this.service = service;
    this.id = roomID;
    this.stage = GAME_STAGES.waiting;
    this.players = [host];
    this.updateClients();
  }

  updateClients = () => {
    this.service.sendActionToRoom({
      room: {
        id: this.id,
        stage: this.stage,
        blackCard: this.blackCard,
        players: this.players,
      },
    });
  };

  registerPlayer = (player) => {
    this.players.push(player);
    this.updateClients();
  };

  start = () => {
    const czarIndex = Math.floor(Math.random() * this.players.length);
    this.czar = this.players[czarIndex];
    this.stage = GAME_STAGES.active;
    this.blackCard = filteredBlackCards.pop();
    this.updateClients();
  };

  check = () => {};
}

export default Room;
