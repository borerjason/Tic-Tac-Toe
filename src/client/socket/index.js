import socketIOClient from 'socket.io-client';

const socket = socketIOClient('http://localhost:3000');

const subscribeToMessages = (cb) => {
  socket.on('message', msg => cb(null, msg))
}

const sendNewMessage = (msg) => {
  socket.emit('message', msg);
}

const newGame = () => {
  socket.emit('newGame');
}

const updateGameId = (cb) => {
  socket.on('newGame', (gameId) => cb(null, gameId));
}

const joinGame = (data) => {
  console.log('data in socket client', data);
  socket.emit('joinGame', data);
}

const confirmJoinNewGame = (cb) => {
  console.log('trigger in confimr join')
  socket.on('joinGame', (data) => cb(null, data));
}


export { subscribeToMessages, sendNewMessage, newGame, updateGameId, joinGame, confirmJoinNewGame };
