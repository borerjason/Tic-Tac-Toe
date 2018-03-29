import React from 'react';

// import Messages from '../Messages';
import Board from '../Board';
import Welcome from '../Welcome';
import { startGame, updateGameId } from '../../socket';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      activeGame: false,
      gameId: '',
      message: '',
      role: '',
    }
    
    updateGameId((err, gameId) => {
      this.setState({ 
        activeGame: true,
        gameId,
        message: `Send your game id to a friend to get started. Your game id is: ${gameId}`,
        role: 'X'
      });
    });

    this.startNewGame = this.startNewGame.bind(this);
  }
  
  startNewGame(e) {
    e.preventDefault();
    startGame();
  }

  render() {
    return (
      <div>
        {!this.state.activeGame ? 
          <Welcome 
            newGame={this.startNewGame} 
          /> : 
          <div>
            <Board 
              message={this.state.message}
              role={this.state.role}/>
            {/* <Messages /> */}
          </div>}
      </div>
    );
  }
};

export default App;
