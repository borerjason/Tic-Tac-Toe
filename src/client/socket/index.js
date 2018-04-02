import socketIOClient from 'socket.io-client';

const socket = socketIOClient('http://localhost:3000');

const subscribeToMessages = (cb) => {
  socket.on('message', msg => cb(null, msg));
};

const sendNewMessage = (msg) => {
  socket.emit('message', msg);
};

const newGame = (data) => {
  socket.emit('newGame', data);
};

const updateGameId = (cb) => {
  socket.on('newGame', gameId => cb(null, gameId));
};

const joinGame = (data) => {
  socket.emit('joinGame', data);
};

const confirmJoinNewGame = (cb) => {
  socket.on('joinGame', data => cb(null, data));
};

const startGame = (cb) => {
  socket.on('startGame', data => cb(null, data));
};

const updateBoard = (data) => {
  socket.emit('updateBoard', data);
};

const clientUpdateBoard = (cb) => {
  socket.on('updateBoard', data => cb(null, data));
};

export {
  subscribeToMessages,
  sendNewMessage,
  newGame,
  updateGameId,
  joinGame,
  confirmJoinNewGame,
  startGame,
  updateBoard,
  clientUpdateBoard,
};
