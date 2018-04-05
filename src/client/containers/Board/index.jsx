import React from 'react';
import PropTypes from 'prop-types';

import { startGame, updateBoard, clientUpdateBoard } from '../../socket';
import { winningPlayer, validateMove } from './state-functions';
import onMoveUpdateBoard from '../../helpers/onMoveUpdateBoard';
import buildBoard from '../../helpers/buildBoard';
import { Wrapper, Message, MsgDiv, Btn } from '../../components';
import Body from './Body';

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      n: 3, // hardcoded n to 3 but design of app should work if n is any size
      board: [['', '', ''], ['', '', ''], ['', '', '']], // representation of board used to identify winners or tie
      turn: 'X', // the 'X' always goes first
      opponent: false, // doesnt let game start until an opponent has arrived
      winner: false, // this should be named isWinner and not to be confused with winner in other file
      numOfPlays: 0, // increments on each turn, keeps track of whether there is a tie and doesn't check for winner until min number has been reached
    };

    /*
    Action is emited from server to both players:
    data: array of players
    */
    startGame((err, data) => {
      if (err) throw new Error('Error starting game');
      this.setState({
        opponent: true,
      });
      
      // array of players passed up to App
      this.props.updateOpponent(data);
    });
     
    /*
      Action is emited from server to both players on each game play
      data: { board, turn, winner (isWinner), numOfPlays }
    */
    clientUpdateBoard((err, data) => {
      if (err) throw new Error('Error starting game');

      const {
        board, turn, winner, numOfPlays,
      } = data;
      
      // make sure alert message is reset
      // IMPROVE could move this to be nested in a another function, could only run if there is actually an alert msg
      this.props.updateMessage('');
      /*
      victor returns 'X' or 'O' if somebody one or false if there is no winner
      IMPROVE: This should only run if winner is true....
      */
      const victor = winningPlayer(data, this.props);

      if (victor) this.props.updateScoreboard(victor);

      this.setState({
        board, turn, winner, numOfPlays,
      });
    });

    this.onClickValidateMove = this.onClickValidateMove.bind(this);
    this.restartGame = this.restartGame.bind(this);
  }

  onClickValidateMove(id, val, loc) {
    let {
      board, turn, n, winner, numOfPlays,
    } = this.state;

    const {
      role, gameId,
    } = this.props;

    const alertMessage = validateMove(this.state, this.props, val);

    if (alertMessage === false) {
      [board, turn, numOfPlays, winner] = onMoveUpdateBoard(board, turn, numOfPlays, winner, loc, role, n);

      /* send updated board to other user via socket */
      updateBoard({
        board, turn, gameId, winner, numOfPlays,
      });
    } else {
      this.props.updateMessage(alertMessage);
    }
  }

  restartGame() {
    this.setState({
      board: [['', '', ''], ['', '', ''], ['', '', '']],
      winner: false,
      numOfPlays: 0,
    }, () => {
      const { gameId } = this.props;
      const {
        board, winner, turn, numOfPlays,
      } = this.state;
      updateBoard({
        board, turn, gameId, winner, numOfPlays,
      });
    });
  }

  render() {
    const { role, name, opponent } = this.props;
    const {
      n, board, winner, turn, numOfPlays,
    } = this.state;
    const quadrants = buildBoard(n, board, this.onClickValidateMove);
    const lastPlayer = turn === 'X' ? 'O' : 'X';
    const winPlayer = lastPlayer === role ? name : opponent;

    return (
      <Wrapper>
        {(winner || numOfPlays === 9) ?
          <Wrapper>
            {winner ? <Message>{winPlayer} Wins!</Message> : <Message>Tie!</Message>}
          </Wrapper> :
          <MsgDiv>
            {!winner && this.state.opponent && this.state.turn === this.props.role && <Message>It's {name}'s turn!</Message>}
            {!winner && this.state.opponent && this.state.turn !== this.props.role && <Message>It's {opponent}'s turn!</Message>}
          </MsgDiv>
        }
        <Body>
          {quadrants}
        </Body>
        {(winner || numOfPlays === 9) &&
          <Btn
            onClick={this.restartGame}
          >Start Another Game
          </Btn>}
      </Wrapper>
    );
  }
}

Board.propTypes = {
  updateOpponent: PropTypes.func.isRequired,
  updateScoreboard: PropTypes.func.isRequired,
  updateMessage: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  opponent: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
  gameId: PropTypes.string.isRequired,
};

export default Board;
