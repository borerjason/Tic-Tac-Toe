import React from 'react';
import styled from 'styled-components';

// import Messages from '../Messages';
import Board from '../Board';
import Home from '../Home';
import Scoreboard from '../Scoreboard';
import { newGame, updateGameId, joinGame, confirmJoinNewGame } from '../../socket';

const AppWrapper = styled.div`
  display: flex;
  // height: 50vh;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: yellow;
`

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`

const GameWrapper = styled.div`
  display: flex;
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
      name: '',
      opponent: 'TBD',
      userWins: 0,
      opponentWins: 0
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
      this.setState({
        activeGame: true,
        gameId: data.gameId,
        message: `You've joined, it is your opponents turn`,
        role: 'O',
        opponent: data.opponent
      });
    })

    this.startNewGame = this.startNewGame.bind(this);
    this.joinExistingGame = this.joinExistingGame.bind(this);
    this.updateOpponent = this.updateOpponent.bind(this);
    this.onWinUpdateScoreboard = this.onWinUpdateScoreboard.bind(this);
  }
  
  startNewGame(e, name) {
    e.preventDefault();
    this.setState({ name });
    newGame({ name });
  }
  
  joinExistingGame(e, gameId, name) {
    e.preventDefault();
    this.setState({ name });
    joinGame({ gameId, name });
  }

  updateOpponent(players) {
    const name = this.state.name;
    const opponent = name === players[0] ? players[1] : players[0];
    this.setState({ opponent });
  }

  onWinUpdateScoreboard(winner) {
    let { userWins, opponentWins } = this.state;
    winner === this.state.name ? userWins ++ : opponentWins++;
    this.setState({ userWins, opponentWins}); 
  }

  render() {
    return (
      <AppWrapper>
        {!this.state.activeGame ? 
          <Home 
            newGame={this.startNewGame} 
            joinGame={this.joinExistingGame}
          /> : 
          <GameWrapper>
            <Board 
              message={this.state.message}
              gameId={this.state.gameId}
              updateOpponent={this.updateOpponent} 
              role={this.state.role}
              name={this.state.name}
              opponent={this.state.opponent}
              updateScoreboard={this.onWinUpdateScoreboard}
            />
            <Wrapper>
              <Scoreboard
                name={this.state.name}
                opponent={this.state.opponent}
                userWins={this.state.userWins}
                opponentWins={this.state.opponentWins}
              />
              <div> THis will be scoreboard {this.state.name} vs {this.state.opponent} </div>
              <div> This will be chatService</div>
            </Wrapper>
          </GameWrapper>}
      </AppWrapper>
    );
  }
};

export default App;
