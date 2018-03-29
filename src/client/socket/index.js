import socketIOClient from 'socket.io-client';

const socket = socketIOClient('http://localhost:3000');

const subscribeToMessages = (cb) => {
  socket.on('message', msg => cb(null, msg))
}

const sendNewMessage = (msg) => {
  socket.emit('message', msg);
}

const startGame = (cb) => {
  socket.emit('startGame');
}

const updateGameId = (cb) => {
  socket.on('startGame', (gameId) => cb(null, gameId));
}

export { subscribeToMessages, sendNewMessage, startGame, updateGameId };
