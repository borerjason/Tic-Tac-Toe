import React from 'react';
import styled from 'styled-components';

import { startGame, updateBoard, clientUpdateBoard } from '../../socket';
import { checkWinner } from '../../helpers/gameplay';
import buildBoard from '../../helpers/buildBoard';
import Body from './Body'; 
import BoardPiece from '../BoardPiece';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

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
    }
    
    startGame((err) => {
      if (err) throw new Error('Error starting game');
      this.setState({
        opponent: true
      });
    });
    
    clientUpdateBoard((err, data) => {
      if (err) throw new Error('Error starting game');
      const { board, turn, winner } = data;
      this.setState({ board, turn, winner});
    });

    this.onClickValidateMove = this.onClickValidateMove.bind(this);
    this.restartGame = this.restartGame.bind(this);
  }
  
  onClickValidateMove(id, val, loc) {
    const { role, gameId } = this.props;
    const { opponent, n } = this.state;
    
    if(this.state.winner) {
      return;
    } else if (!opponent) {
      alert('Please wait for another player!')
    } else if (this.state.turn !== role) {
      alert('Please wait for your turn');
    } else if (val !== '') {
      alert('This spot as already been played. Please select again!')
    } else { 
      const board = [...this.state.board];
      board[loc[0]][loc[1]] = role;
      const winner = checkWinner(n, board, loc[0], loc[1]);
      const turn = this.state.turn === 'X' ? 'O' : 'X';
      this.setState({ board, turn, winner }, () => {
        updateBoard({ board, turn, gameId, winner });
      });
    }
  }

  restartGame() {
    this.setState({
      board: [['', '', ''], ['', '', ''], ['', '', '']],
      winner: false,
    }, () => {
      const { gameId } = this.props;
      const { n, board, winner, turn } = this.state;
      updateBoard({ board, turn, gameId, winner })
    });
  }

  render() {
    const { role } = this.props;
    const { n, board, winner, turn } = this.state;
    const quadrants = buildBoard(n, board, this.onClickValidateMove);
    const lastPlayer = turn === 'X' ? 'O' : 'X';

    return (
      <Wrapper>
        {winner && 
        <div>
          <h3>{lastPlayer} Wins!</h3>
          <button 
            className='btn-secondary'
            onClick={this.restartGame}
           >Restart Game
          </button>
          </div> }
        {!this.state.opponent && <h3>{this.props.message}</h3>}
        {!winner && this.state.opponent && this.state.turn === this.props.role && <h3>It's Your Turn!</h3>}
        {!winner && this.state.opponent && this.state.turn !== this.props.role && <h3>It's Your Opponent's Turn!</h3>}
        <Body>
        {quadrants}
        </Body>
      </Wrapper>
    )
  }
}

export default Board;
