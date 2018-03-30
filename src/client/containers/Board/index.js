import React from 'react';
import styled from 'styled-components';

import { startGame, updateBoard, clientUpdateBoard } from '../../socket';
import { checkWinner } from '../../helpers/gameplay';
import { buildBoard } from '../../helpers/buildBoard';
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
      n: 3, // make this variable
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
      const { board, turn } = data;
      if (err) throw new Error('Error starting game');
      this.setState({ board, turn });
    });

    this.onClickValidateMove = this.onClickValidateMove.bind(this);
  }
  
  onClickValidateMove(id, val, loc) {
    const { role, gameId } = this.props;
    const { opponent, n } = this.state;
    
    console.log('BOard', this.state.board);
    if (!opponent) {
      alert('Please wait for another player!')
    } else if (this.state.turn !== role) {
      alert('Please wait for your turn');
    } else if (val !== '') {
      alert('This spot as already been played. Please select again!')
    } else { 
      const board = [...this.state.board];
    
      board[loc[0]][loc[1]] = role;
      const winner = checkWinner(n, board, loc[0], loc[1]);
      console.log('Winner?', winner, 'row', loc[0], 'col', loc[1]);
      const turn = this.state.turn === 'X' ? 'O' : 'X';
      this.setState({ board, turn }, () => {
        updateBoard({ board, turn, gameId  });
      });
    }
  }

  render() {
    const { n, board } = this.state;

    const quadrants = buildBoard(n, board, this.onClickValidateMove);
    // const quadrants = [];
    // const n = Math.pow(this.state.n, 2);
    // for (let i = 0; i < n; i+= 1) {
    //   const row = Math.floor(i / this.state.n);
    //   const col = i - (this.state.n * row);
    //   quadrants.push(
    //     <BoardPiece 
    //       validate={this.onClickValidateMove} 
    //       key={i} 
    //       id={i} 
    //       val={this.state.board[row][col]} 
    //       loc={[row, col]}
    //     />
    //   )
    // }

    return (
      <Wrapper>
        {!this.state.opponent && <h3>{this.props.message}</h3>}
        {this.state.opponent && this.state.turn === this.props.role && <h3>It's Your Turn!</h3>}
        {this.state.opponent && this.state.turn !== this.props.role && <h3>It's Your Opponents Turn!</h3>}
        <Body>
        {quadrants}
        </Body>
      </Wrapper>
    )
  }
}

export default Board;
