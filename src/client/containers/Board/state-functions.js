export function updateBoardState(data, props) {
  const { board, turn, winner, numOfPlays } = data;
  const { role, name, opponent, updateScoreboard } = props;
  const alertMessage = '';

  if (winner) {
    const lastPlayer = turn === 'X' ? 'O' : 'X';
    const winningPlayer = lastPlayer === role ? name : opponent;
    updateScoreboard(winningPlayer);
  }  

  return { board, turn, winner, numOfPlays, alertMessage };
}

export function validateMove(state, props, val) {
  const { role } = props;
  let { turn, opponent, winner, numOfPlays } = state;

  if (winner || numOfPlays === 9) {
    return(`Please click 'Start new game' to start new game!`);
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
