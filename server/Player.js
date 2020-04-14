import cards from "./data.json";

const filteredWhiteCards = cards.white
  .filter((card) => card.deck === "Base")
  .sort(() => Math.random() - 0.5);

class Player {
  constructor(username) {
    this.username = username;
    this.cards = filteredWhiteCards.splice(-8, 8);
    this.submittedCards = [];
    this.hasSubmitted = false;
    this.score = 0;
  }
}

export default Player;
