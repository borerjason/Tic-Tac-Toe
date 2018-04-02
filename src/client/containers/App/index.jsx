import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Messages from '../Messages';
import Board from '../Board';
import Home from '../Home';
import Welcome from '../Welcome';
import Scoreboard from '../Scoreboard';
import { Header, Wrapper, MsgDiv, AlertMessage, GameWrapper } from '../../components';
import { updateOpponent, onWinUpdateScoreboard } from './state-functions';
import { updateGameId, confirmJoinNewGame } from '../../socket';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gameId: '',
      message: '',
      role: '',
      name: '',
      opponent: 'TBD',
      userWins: 0,
      opponentWins: 0,
      chatMessages: [],
      msgBody: '',
    };

    updateGameId((err, gameId) => {
      this.setState({
        gameId,
        message: `Send your game id to a friend to play. Your game id is: ${gameId}`,
        role: 'X',
      });
    });

    confirmJoinNewGame((err, data) => {
      this.setState({
        gameId: data.gameId,
        role: 'O',
        opponent: data.opponent,
      });
    });

    this.onSignUpUpdateName = this.onSignUpUpdateName.bind(this);
    this.updateOpponent = this.updateOpponent.bind(this);
    this.onWinUpdateScoreboard = this.onWinUpdateScoreboard.bind(this);
    this.updateAlertMessage = this.updateAlertMessage.bind(this);
  }

  onWinUpdateScoreboard(winner) {
    const newState = onWinUpdateScoreboard(this.state, winner);
    this.setState(newState);
  }

  onSignUpUpdateName(name) {
    this.setState({ name });
  }

  updateOpponent(players) {
    const opponent = updateOpponent(this.state.name, players);
    this.setState({ opponent, message: '' });
  }

  updateAlertMessage(message) {
    this.setState({ message });
  }

  render() {
    return (
      <Wrapper>
        <Header>Tic-Tac-Toe</Header>
        <MsgDiv>
          <AlertMessage>{this.state.message}</AlertMessage>
        </MsgDiv>
        <Router>
          <Switch>
            <Route
              exact
              path="/"
              render={() => (
                <Wrapper>
                  <Welcome
                    updateName={this.onSignUpUpdateName}
                  />
                </Wrapper>
              )}
            />
            <Route
              path="/home"
              render={() => (
                <Wrapper>
                  <Home
                    name={this.state.name}
                    updateMessage={this.updateAlertMessage}
                  />
                </Wrapper>
              )}
            />
            <Route
              path="/game"
              render={() => (
                <GameWrapper>

                <Wrapper>
                  <Board
                    message={this.state.message}
                    gameId={this.state.gameId}
                    updateOpponent={this.updateOpponent}
                    role={this.state.role}
                    name={this.state.name}
                    opponent={this.state.opponent}
                    updateScoreboard={this.onWinUpdateScoreboard}
                    updateMessage={this.updateAlertMessage}
                  />
                    <Scoreboard
                      name={this.state.name}
                      opponent={this.state.opponent}
                      userWins={this.state.userWins}
                      opponentWins={this.state.opponentWins}
                    />
                  </Wrapper>
                    <div>
                      <Messages
                        gameId={this.state.gameId}
                        name={this.state.name}
                      />
                    </div>
                </GameWrapper>
            
              )}
            />
          </Switch>
        </Router>
      </Wrapper>
    );
  }
}

export default App;
