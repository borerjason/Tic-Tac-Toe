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
      const { board, turn, winner, numOfPlays } = data;
      this.setState({ board, turn, winner, numOfPlays });
    });

    this.onClickValidateMove = this.onClickValidateMove.bind(this);
    this.restartGame = this.restartGame.bind(this);
  }
  
  onClickValidateMove(id, val, loc) {
    const { role, gameId } = this.props;
    let { turn, opponent, n, winner, numOfPlays } = this.state;
    
    if(winner || numOfPlays === 9) {
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
      turn = turn === 'X' ? 'O' : 'X';
      numOfPlays += 1;

      if (numOfPlays > 4) {
        winner = checkWinner(n, board, loc[0], loc[1]);
      }
      
      this.setState({ board, turn, winner, numOfPlays }, () => {
      });
      updateBoard({ board, turn, gameId, winner, numOfPlays });
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
    const { role } = this.props;
    const { n, board, winner, turn, numOfPlays } = this.state;
    const quadrants = buildBoard(n, board, this.onClickValidateMove);
    const lastPlayer = turn === 'X' ? 'O' : 'X';
 
    return (
      <Wrapper>
        {(winner || numOfPlays === 9) ?
        <div>
          {winner ? <h3>{lastPlayer} Wins!</h3> : <h3>Tie!</h3>}
          <button 
            className='btn-secondary'
            onClick={this.restartGame}
           >Restart Game
          </button>
          </div> :
          <div>
        {!this.state.opponent && <h3>{this.props.message}</h3>}
        {!winner && this.state.opponent && this.state.turn === this.props.role && <h3>It's Your Turn!</h3>}
        {!winner && this.state.opponent && this.state.turn !== this.props.role && <h3>It's Your Opponent's Turn!</h3>}
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
