import React from 'react';

const BoardPiece = (props) => {
  console.log(props);
  return (
    <div
      onClick={() => props.validate(props.id, props.val, props.loc)}
      >{props.val}
    </div>
  )
}

export default BoardPiece;
