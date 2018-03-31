import React from 'react';
import styled from 'styled-components';

import { startGame, updateBoard, clientUpdateBoard } from '../../socket';
// import { checkWinner } from '../../helpers/gameplay';
import onMoveUpdateBoard from '../../helpers/onMoveUpdateBoard';
import buildBoard from '../../helpers/buildBoard';
import Body from './Body'; 
import BoardPiece from '../BoardPiece';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
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
      const { role, name, opponent, updateScoreboard } = this.props;

      if (winner) {
        const lastPlayer = turn === 'X' ? 'O' : 'X';
        const winningPlayer = lastPlayer === role ? name : opponent;
        updateScoreboard(winningPlayer);
      } 

      this.setState({ board, turn, winner, numOfPlays });
    });

    this.onClickValidateMove = this.onClickValidateMove.bind(this);
    this.restartGame = this.restartGame.bind(this);
  }
  
  onClickValidateMove(id, val, loc) {
    const { role, gameId, updateScoreboard } = this.props;
    let { board, turn, opponent, n, winner, numOfPlays } = this.state;
    
    if(winner || numOfPlays === 9) {
      return;
    } else if (!opponent) {
      alert('Please wait for another player!')
    } else if (this.state.turn !== role) {
      alert('Please wait for your turn');
    } else if (val !== '') {
      alert('This spot as already been played. Please select again!')
    } else { 
     [board, turn, numOfPlays, winner] = onMoveUpdateBoard(board, turn, numOfPlays, winner, loc, role, n);
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
    const { role, name, opponent } = this.props;
    const { n, board, winner, turn, numOfPlays } = this.state;
    const quadrants = buildBoard(n, board, this.onClickValidateMove);
    const lastPlayer = turn === 'X' ? 'O' : 'X';
    const winningPlayer = lastPlayer === role ? name : opponent;
 
    return (
      <Wrapper>
        {(winner || numOfPlays === 9) ?
        <div>
          {winner ? <h3>{winningPlayer} Wins!</h3> : <h3>Tie!</h3>}
          <button 
            className='btn-secondary'
            onClick={this.restartGame}
           >Restart Game
          </button>
          </div> :
          <div>
        {!this.state.opponent && <h3>{this.props.message}</h3>}
        {!winner && this.state.opponent && this.state.turn === this.props.role && <h3>It's {name}'s Turn!</h3>}
        {!winner && this.state.opponent && this.state.turn !== this.props.role && <h3>It's {opponent}'s Turn!</h3>}
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
