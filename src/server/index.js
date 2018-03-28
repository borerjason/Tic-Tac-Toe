const express = require('express');
const path = require('path');

const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.use( '/', express.static(path.join(__dirname, '../../dist')));

io.on('connection', (socket) => {
  console.log('A player connected');
  socket.on('message', (msg) => {
    io.emit('message', msg);
  });
});

const PORT = process.env.PORT || 3000;

http.listen(PORT, () => { 
  console.log(`Listening on PORT: ${PORT}`) 
});
