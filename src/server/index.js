const express = require('express');
const path = require('path');

const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

let gameId = 100;

app.use( '/', express.static(path.join(__dirname, '../../dist')));

io.on('connection', (socket) => {
  console.log('A player connected');
  socket.on('message', (msg) => {
    io.emit('message', msg);
  });

  socket.on('newGame', () => {
    console.log('new game');
    socket.join(++gameId);
    io.to(gameId).emit('newGame', gameId);
  })

  socket.on('joinGame', (data) => {
    console.log('data in server', data);
    const room = parseInt(data.gameId);
    socket.join(room);
    socket.emit(('joinGame', data));
    // io.to(room.emit('startGame', {msg: `${data.name} has joined the game!`}))
  });
  
});



const PORT = process.env.PORT || 3000;

http.listen(PORT, () => { 
  console.log(`Listening on PORT: ${PORT}`) 
});
