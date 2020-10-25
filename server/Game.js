import cards from "./data.json";

class Game {
  constructor(roomID, host) {
    this.id = roomID;
    this.host = host.username;
    this.players = [host];
    this.hasStarted = false;
    this.isReadyToJudge = false;
  }

  getData() {
    return {
      id: this.id,
      players: this.players,
      host: this.host,
      hasStarted: this.hasStarted,
      isReadyToJudge: this.isReadyToJudge,
      czar: this.czar,
      submitters: this.submitters,
      blackCard: this.blackCard,
      lastWinner: this.lastWinner,
    };
  }

  registerPlayer = (player) => {
    this.players.push(player);
  };

  removePlayer = (username) => {
    this.players = this.players.filter((p) => p.username !== username);
  };

  findPlayer = (username) => this.players.find((p) => p.username === username);

  start = ({ decks }) => {
    if (this.players.length < 3) {
      if (process.env.NODE_ENV !== "dev") {
        throw new Error("There should be at least 3 players to start game.");
      }
    }
    this.filteredBlackCards = cards.black
      .filter((card) => decks.includes(card.deck))
      .sort(() => Math.random() - 0.5);
    this.filteredWhiteCards = cards.white
      .filter((card) => decks.includes(card.deck))
      .sort(() => Math.random() - 0.5);
    const czarIndex = Math.floor(Math.random() * this.players.length);
    this.czar = this.players[czarIndex].username;
    this.submitters = this.players.filter((p) => p.username !== this.czar);
    this.hasStarted = true;
    this.blackCard = this.filteredBlackCards.pop();
    this.players.forEach((player) => {
      player.cards = this.filteredWhiteCards.splice(-8, 8);
    });
  };

  startNewRound = () => {
    // clear player states
    this.players.forEach((player) => {
      if (player.isWaiting) {
        player.cards = this.filteredWhiteCards.splice(-8, 8);
        player.isWaiting = false;
      }
      player.submittedCards = [];
      player.hasSubmitted = false;
    });
    this.submitters.forEach((submitter) => {
      submitter.cards = [
        ...submitter.cards,
        ...this.filteredWhiteCards.splice(
          -this.blackCard.pick,
          this.blackCard.pick
        ),
      ];
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
    this.blackCard = this.filteredBlackCards.pop();
    this.isReadyToJudge = false;
  };

  submit_card = (payload) => {
    const { username, card } = payload;
    const player = this.findPlayer(username);
    player.submittedCards.push(card);
    player.hasSubmitted = this.blackCard.pick === player.submittedCards.length;

    // remove card
    player.cards = player.cards.filter((c) => c.text !== card.text);

    // check game state
    this.isReadyToJudge = this.submitters.every((p) => p.hasSubmitted);
  };

  submit_winner = (winner) => {
    const player = this.findPlayer(winner);
    this.lastWinner = {
      blackCard: this.blackCard,
      player,
      submittedCards: player.submittedCards,
    };
    player.score++;

    this.startNewRound();
  };
}

export default Game;
