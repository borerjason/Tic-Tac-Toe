import React from 'react';
import PieceWrapper from './PieceWrapper';
import Piece from './Piece';

const BoardPiece = (props) => {
  return (
    <PieceWrapper
      onClick={() => props.validate(props.id, props.val, props.loc)}
    >
      <Piece>{props.val}</Piece>
    </PieceWrapper>
  )
}

export default BoardPiece;
