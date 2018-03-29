import React from 'react';
import styled from 'styled-components';

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
      board: [['X', '', ''], ['', 'X', ''], ['O', '', '']],
      turn: 'X',
      opponent: false,
    }

    this.onClickValidateMove = this.onClickValidateMove.bind(this);
  }
  
  onClickValidateMove(id, val, loc) {
    if (!this.state.opponent) {
      alert('Please wait for another player!')
    } else if (this.state.turn !== this.state.role) {
      alert('Please wait for your turn');
    } else if (val !== '') {
      alert('This spot as already been played. Please select again!')
    } else { 
      const board = [...this.state.board];
      board[loc[0]][loc[1]] = this.props.role;
      this.setState({ board });
    }
  }

  render() {
    const quadrants = [];
    const n = Math.pow(this.state.n, 2);
    for (let i = 0; i < n; i+= 1) {
      const row = Math.floor(i / this.state.n);
      const col = i - (this.state.n * row);
      quadrants.push(
        <BoardPiece 
          validate={this.onClickValidateMove} 
          key={i} 
          id={i} 
          val={this.state.board[row][col]} 
          loc={[row, col]}
        />
      )
    }
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
