import React from 'react';
import BoardPiece from '../../containers/BoardPiece';

/*
takes in size, previous board, validate function
returns array of board pieces
*/

const buildBoard = (size, board, validate) => {
  const quadrants = [];
  const n = size ** 2;

  for (let i = 0; i < n; i += 1) {
    const row = Math.floor(i / size);
    const col = i - (size * row);

    /*
    Id is place in array
    loc is represenation in board 2D array
    val is its value from 2D board represnetation
    */

    quadrants.push(<BoardPiece
      validate={validate}
      key={i}
      id={i}
      val={board[row][col]}
      loc={[row, col]}
    />);
  }

  return quadrants;
};

export default buildBoard;
