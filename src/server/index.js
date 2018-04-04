const express = require('express');
const path = require('path');

const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const db = require('./Games');
console.log(db);

let gameId = 100;
const games = {};

app.use('/', express.static(path.join(__dirname, '../../dist')));

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../dist/index.html'), (err) => {
    if (err) {
      res.status(500).send(err);
    }
  });
});

io.on('connection', (socket) => {
  console.log('A player connected');

  socket.on('newGame', (data) => {
    const id = db.newGame(data.name);
    socket.join(id);
    socket.emit('newGame', id.toString());
  });

  socket.on('joinGame', (data) => {
    const id = parseInt(data.gameId, 10);
    const game = db.games[id];
    if (!game) { console.log('No game exists'); }
    if (game.size() === 0) { console.log('There is nobody in this room'); }
    if (game.size() === 2) { console.log('Game is full'); }

    game.addPlayer(data.name);

    const opponent = game.firstPlayer;
    const { players } = game;
    socket.join(id);
    socket.emit('joinGame', { gameId: id, opponent });
    io.in(id).emit('startGame', players);
  });

  socket.on('updateBoard', (data) => {
    const {
      board, turn, gameId, winner, numOfPlays,
    } = data;
    io.in(gameId).emit('updateBoard', {
      board, turn, winner, numOfPlays,
    });
  });

  socket.on('message', (data) => {
    io.in(data.gameId).emit('message', data.message);
  });
});

const PORT = process.env.PORT || 3000;

http.listen(PORT, () => {
  console.log(`Listening on PORT: ${PORT}`);
});
