import React from 'react';
import BoardPiece from '../../containers/BoardPiece';

const buildBoard = (size, board, validate) => {
  const quadrants = [];
  const n = size ** 2;

  for (let i = 0; i < n; i += 1) {
    const row = Math.floor(i / size);
    const col = i - (size * row);

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
