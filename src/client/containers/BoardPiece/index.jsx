import React from 'react';
import PropTypes from 'prop-types';

import PieceWrapper from './PieceWrapper';
import Piece from './Piece';

const BoardPiece = props =>
  (
    <PieceWrapper
      onClick={() => props.validate(props.id, props.val, props.loc)}
    >
      <Piece>{props.val}</Piece>
    </PieceWrapper>
  );

BoardPiece.propTypes = {
  validate: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  val: PropTypes.string.isRequired,
  loc: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default BoardPiece;
