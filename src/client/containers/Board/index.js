import React from 'react';
import styled from 'styled-components';

import { startGame, updateBoard, clientUpdateBoard } from '../../socket';
import { winningPlayer, validateMove } from './state-functions';
import onMoveUpdateBoard from '../../helpers/onMoveUpdateBoard';
import buildBoard from '../../helpers/buildBoard';
import BoardPiece from '../BoardPiece';
import { Wrapper, Message, BtnLink } from '../../components'
import AlertMessage from './AlertMessage';
import RestartBtn from './RestartBtn';
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
      alertMessage: ''
    }
    
    startGame((err, data) => {
      if (err) throw new Error('Error starting game');
      this.setState({
        opponent: true
      });

      this.props.updateOpponent(data);
    });
    
    clientUpdateBoard((err, data) => {
      if (err) throw new Error('Error starting game');
      const { board, turn, winner, numOfPlays } = data;
      const { role, name, opponent, updateScoreboard } = props;
      const alertMessage = '';
      const victor = winningPlayer(data, this.props);
      if(victor) updateScoreboard(victor);
      this.setState({ board, turn, winner, numOfPlays, alertMessage });
    });

    this.onClickValidateMove = this.onClickValidateMove.bind(this);
    this.restartGame = this.restartGame.bind(this);
  }
  
  onClickValidateMove(id, val, loc) {
    let { board, turn, opponent, n, winner, numOfPlays } = this.state;
    const { role, gameId, updateScoreboard } = this.props;
    const alertMessage = validateMove(this.state, this.props, val)

    if (alertMessage === false) {
      [board, turn, numOfPlays, winner] = onMoveUpdateBoard(board, turn, numOfPlays, winner, loc, role, n);
      
       /* send updated board to other user via socket */
       updateBoard({ board, turn, gameId, winner, numOfPlays });
    } else {
      this.setState({ alertMessage })
    }
  }

  restartGame() {
    this.setState({
      board: [['', '', ''], ['', '', ''], ['', '', '']],
      winner: false,
      numOfPlays: 0,
    }, () => {
      const { gameId } = this.props;
      const { n, board, winner, turn, numOfPlays } = this.state;
      updateBoard({ board, turn, gameId, winner, numOfPlays })
    });
  }

  render() {
    const { role, name, opponent } = this.props;
    const { n, board, winner, turn, numOfPlays, alertMessage } = this.state;
    const quadrants = buildBoard(n, board, this.onClickValidateMove);
    const lastPlayer = turn === 'X' ? 'O' : 'X';
    const winningPlayer = lastPlayer === role ? name : opponent;
 
    return (
      <Wrapper>
        {alertMessage && <AlertMessage>{alertMessage}</AlertMessage>}
        {(winner || numOfPlays === 9) ?
        <Wrapper>
          {winner ? <Message>{winningPlayer} Wins!</Message> : <Message>Tie!</Message>}
          <RestartBtn 
            onClick={this.restartGame}
           >Start Another Game
          </RestartBtn>
          </Wrapper> :
          <div>
        {!this.state.opponent && <Message>{this.props.message}</Message>}
        {!winner && this.state.opponent && this.state.turn === this.props.role && <Message>It's {name}'s Turn!</Message>}
        {!winner && this.state.opponent && this.state.turn !== this.props.role && <Message>It's {opponent}'s Turn!</Message>}
        </div>
        }
        <Body>
        {quadrants}
        </Body>
      </Wrapper>
    )
  }
}

export default Board;
