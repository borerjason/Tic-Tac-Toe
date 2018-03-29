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

  socket.on('startGame', () => {
    console.log('start game');
    socket.join(++gameId);
    io.to(gameId).emit('startGame', gameId);
  })
  
});


const PORT = process.env.PORT || 3000;

http.listen(PORT, () => { 
  console.log(`Listening on PORT: ${PORT}`) 
});
