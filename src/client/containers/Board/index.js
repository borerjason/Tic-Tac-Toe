import React from 'react';

import BoardPiece from '../BoardPiece';

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      n: 3, // make this variable
      board: [['a', 'a', 'a'], ['', '', ''], ['', '', '']],
      turn: 'X',
      role: 'X',
    }

    this.onClickValidateMove = this.onClickValidateMove.bind(this);
  }
  
  onClickValidateMove(id, val, loc) {
    if (this.state.turn !== this.state.role) {
      alert('Please wait for your turn');
   
    } else if (val !== '') {
      alert('This spot as already been played. Please select again!')
    } else { 
      const board = [...this.state.board];
      board[loc[0]][loc[1]] = this.state.role;
      this.setState({ board });
    }
  }

  updateBoard() {

  }
  render() {
    const quadrants = [];
    const n = Math.pow(this.state.n, 2);
    for (let i = 0; i < n; i+= 1) {
      const row = Math.floor(i / this.state.n);
      const col = i - (this.state.n * row);
      quadrants.push(
        <BoardPiece 
          validate={this.onClickValidateMove} key={i} id={i} val={this.state.board[row][col]} loc={[row, col]} />
      )
    }

    return (
      <div>
        {quadrants}
      </div>
    )
  }
}

export default Board;