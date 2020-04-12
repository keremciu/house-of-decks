import cards from "./data.json";

const filteredWhiteCards = cards.white
  .filter((card) => card.deck === "Base")
  .sort(() => Math.random() - 0.5);

class Player {
  constructor(username) {
    this.username = username;
    this.score = 0;
    this.cards = filteredWhiteCards.splice(-10, 10);
    this.submittedCards = [];
    this.hasSubmitted = false;
  }
}

export default Player;
