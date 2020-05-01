class Player {
  constructor(username) {
    this.username = username;
    this.submittedCards = [];
    this.hasSubmitted = false;
    this.score = 0;
  }
}

export default Player;
