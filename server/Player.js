class Player {
  constructor(username) {
    this.username = username;
    this.submittedCards = [];
    this.hasSubmitted = false;
    this.score = 0;
    this.isWaiting = false;
  }
}

export default Player;
