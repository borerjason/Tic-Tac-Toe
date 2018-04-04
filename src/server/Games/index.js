const Game = require('./Game');

class Games {
  constructor() {
    this.games = {};
  }

  newGame(name) {
    const id = Math.floor(Math.random() * 100);
    const newGame = new Game(id);
    newGame.addPlayer(name);
    this.games[id] = newGame;
    return id;
  }

  size() {
    return this.games.length;
  }

  last() {
    return this.games[this.size() - 1];
  }
}

const db = new Games();

module.exports = db;
