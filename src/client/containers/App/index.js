import React from 'react';

import Messages from '../Messages';
import Board from '../Board';
import Welcome from '../Welcome';

const App = () => {
  return (
    <div>
      <Messages />
      <Welcome />
      <Board />
    </div>
  );
};

export default App;
