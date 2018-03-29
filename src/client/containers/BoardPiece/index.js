import React from 'react';
import styled from 'styled-components';

const PieceWrapper = styled.div`
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  width: 33%;
  height: 33%;
  border: 1px solid black;
`;

const BoardPiece = (props) => {
  console.log(props);
  return (
    <PieceWrapper
      onClick={() => props.validate(props.id, props.val, props.loc)}
      >{props.val}
    </PieceWrapper>
  )
}

export default BoardPiece;
