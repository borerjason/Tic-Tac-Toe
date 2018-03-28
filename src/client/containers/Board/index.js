import React from 'react';

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      n: 3, // make this variable
      board: [['', '', ''], ['', '', ''], ['', '', '']],
    }

    this.onClickValidateMove = this.onClickValidateMove.bind(this);
  }
  
  onClickValidateMove(id) {
    console.log(id);
    const row = Math.floor(id / this.state.n);
    const col = id - (this.state.n * row);
    const board = [...this.state.board];
    board[row][col] = 'X';
    console.log(board);
    console.log(this.state.board);
  }

  updateBoard() {

  }
  render() {
    const quadrants = [];
    const n = Math.pow(this.state.n, 2);
    for (let i = 0; i < n; i+= 1) {
      quadrants.push(
        <div 
          onClick={() => this.onClickValidateMove(i)} key={i} id={i} val=''>{i}</div>
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
