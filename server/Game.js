import { GAME_STAGES } from "../client/src/Game/mappings.js";
import cards from "./data.json";

const filteredBlackCards = cards.black
  .filter((card) => card.deck === "Base")
  .sort(() => Math.random() - 0.5);

class Game {
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
    service.sendActionToRoom({
      room,
    });
  };

  registerPlayer = (player) => {
    this.players.push(player);
    this.updateClients();
  };

  removePlayer = (username) => {
    this.players = this.players.filter((p) => p.username !== username);
    this.updateClients();
  };

  findPlayer = (username) => this.players.find((p) => p.username === username);

  start = () => {
    const czarIndex = Math.floor(Math.random() * this.players.length);
    this.czar = this.players[czarIndex].username;
    this.submitters = this.players.filter((p) => p.username !== this.czar);
    this.stage = GAME_STAGES.active;
    this.blackCard = filteredBlackCards.pop();
    this.updateClients();
  };

  startNewRound = () => {
    // clear player states
    this.players.forEach((player) => {
      player.submittedCards = [];
      player.hasSubmitted = false;
    });
    // find new czar and clear game state
    const oldCzarIndex = this.players.findIndex(
      (p) => p.username === this.czar
    );
    let czarIndex = oldCzarIndex + 1;
    if (czarIndex >= this.players.length) {
      czarIndex = 0;
    }
    this.czar = this.players[czarIndex].username;
    this.submitters = this.players.filter((p) => p.username !== this.czar);
    this.blackCard = filteredBlackCards.pop();
    this.isReadyToJudge = false;
  };

  submitCard = (username, card) => {
    const player = this.findPlayer(username);
    player.submittedCards.push(card);
    player.hasSubmitted = this.blackCard.pick === player.submittedCards.length;
    // remove card
    player.cards = player.cards.filter((c) => c.text !== card.text);

    console.log(player.submittedCards);

    // check game state
    this.isReadyToJudge = this.submitters.every((p) => p.hasSubmitted);
    this.updateClients();
  };

  submitWinner = (winner) => {
    const player = this.findPlayer(winner);
    player.score++;

    this.startNewRound();
    this.updateClients();
  };
}

export default Game;
