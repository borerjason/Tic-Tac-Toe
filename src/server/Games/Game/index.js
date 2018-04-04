class Game {
  constructor(id) {
    this.id = id;
    this.players = [];
  }

  addPlayer(name) {
    this.players.push(name);
  }

  size() {
    return this.players.length;
  }

  firstPlayer() {
    return this.players[0];
  }
}

module.exports = Game;
