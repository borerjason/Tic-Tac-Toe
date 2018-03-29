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
      gameId: ''
    }
    
    updateGameId((err, gameId) => {
      this.setState({ 
        gameId,
        activeGame: true
      });
    });

    this.startNewGame = this.startNewGame.bind(this);
  }
  
  startNewGame(e) {
    e.preventDefault();
    startGame();
  }

  render() {
    console.log('GameID', this.state.gameId);
    return (
      <div>
        {!this.state.activeGame ? 
          <Welcome 
            newGame={this.startNewGame} 
          /> : 
          <div>
            <Board />
            {/* <Messages /> */}
          </div>}
      </div>
    );
  }
};

export default App;
