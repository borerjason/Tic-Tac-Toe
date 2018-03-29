import React from 'react';
import styled from 'styled-components';

// import Messages from '../Messages';
import Board from '../Board';
import Welcome from '../Welcome';
import { newGame, updateGameId, joinGame, confirmJoinNewGame } from '../../socket';

const AppWrapper = styled.div`
  display: flex;
  min-height: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

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

    confirmJoinNewGame((err, data) => {
      console.log('DATA', data);
      this.setState({
        activeGame: true,
        gameId: data.gameId,
        message: `You've joined, it is your opponents turn`,
        role: 'O'
      });
    })

    this.startNewGame = this.startNewGame.bind(this);
  }
  
  startNewGame(e) {
    e.preventDefault();
    newGame();
  }

  joinExistingGame(e, gameId) {
    e.preventDefault();
    joinGame({ gameId });
  }

  render() {
    return (
      <AppWrapper>
        {!this.state.activeGame ? 
          <Welcome 
            newGame={this.startNewGame} 
            joinGame={this.joinExistingGame} 
          /> : 
          <div>
            <Board 
              message={this.state.message}
              role={this.state.role}/>
            {/* <Messages /> */}
          </div>}
      </AppWrapper>
    );
  }
};

export default App;
