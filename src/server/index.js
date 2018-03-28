const express = require('express');
const http = require('http').Server(app);
const io = require('socket.io')(http);
const path = require('path');

const app = express();

app.use( '/', express.static(path.join(__dirname, '../../dist')));

io.on('connection', (socket) => {
  console.log('A player connected');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => { 
  console.log(`Listening on PORT: ${PORT}`) 
});
