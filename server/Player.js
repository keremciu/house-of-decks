class Player {
  constructor(username, filteredWhiteCards) {
    this.username = username;
    this.submittedCards = [];
    this.hasSubmitted = false;
    this.score = 0;
  }
}

export default Player;
