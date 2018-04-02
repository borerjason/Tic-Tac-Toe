const express = require('express');
const path = require('path');

const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

let gameId = 100;
const games = {};

app.use('/', express.static(path.join(__dirname, '../../dist')));

io.on('connection', (socket) => {
  console.log('A player connected');
  socket.on('message', (msg) => {
    io.emit('message', msg);
  });

  socket.on('newGame', (data) => {
    socket.join(++gameId);
    games[gameId] = [data.name];
    socket.emit('newGame', gameId);
  });

  socket.on('joinGame', (data) => {
    const room = parseInt(data.gameId, 10);
    data.opponent = games[room][0];
    games[room].push(data.name);
    const players = games[room];
    socket.join(room);
    socket.emit('joinGame', data);
    io.in(room).emit('startGame', players);
  });

  socket.on('updateBoard', (data) => {
    const {
      board, turn, gameId, winner, numOfPlays,
    } = data;
    io.in(gameId).emit('updateBoard', {
      board, turn, winner, numOfPlays,
    });
  });
});

const PORT = process.env.PORT || 3000;

http.listen(PORT, () => {
  console.log(`Listening on PORT: ${PORT}`);
});
