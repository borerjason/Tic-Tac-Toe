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
      n: 3,
      board: [['', '', ''], ['', '', ''], ['', '', '']],
      turn: 'X',
      opponent: false,
      winner: false,
      numOfPlays: 0,
    };

    startGame((err, data) => {
      if (err) throw new Error('Error starting game');
      this.setState({
        opponent: true,
      });

      this.props.updateOpponent(data);
    });

    clientUpdateBoard((err, data) => {
      if (err) throw new Error('Error starting game');

      const {
        board, turn, winner, numOfPlays,
      } = data;

      this.props.updateMessage('');
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
