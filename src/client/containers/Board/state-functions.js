export function winningPlayer(data, props) {
  const { turn, winner } = data;
  const { role, name, opponent } = props;

  if (winner) {
    const lastPlayer = turn === 'X' ? 'O' : 'X';
    const winningPlayer = lastPlayer === role ? name : opponent;
    return winningPlayer;
  }

  return false;  
}

export function validateMove(state, props, val) {
  const { role } = props;
  let { turn, opponent, winner, numOfPlays } = state;

  if (winner || numOfPlays === 9) {
    return(`Please click 'Start another game' to play again!`);
  } else if (!opponent) {
    return;
  } else if (turn !== role) {
    return('Please wait for your turn');
  } else if (val !== '') {
    return('This spot as already been played. Please select again!')
  } else {
    return false;
  }
}
