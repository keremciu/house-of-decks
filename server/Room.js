class Room {
  constructor(service, roomID, host) {
    this.service = service;
    this.id = roomID;
    this.status = "waiting";
    this.players = [host];
    this.updateClients();
  }

  updateClients = () => {
    this.service.sendActionToRoom({
      stage: "waiting_room",
      room: {
        id: this.id,
        status: this.status,
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
    this.status = "running";
  };

  check = () => {};
}

export default Room;
