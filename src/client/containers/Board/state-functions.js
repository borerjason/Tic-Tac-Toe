/*
 returns the winners role if there is a winner or false if there is none
*/

export function winningPlayer(data, props) {
  const { turn, winner } = data;
  const { role, name, opponent } = props;

  if (winner) {
    const lastPlayer = turn === 'X' ? 'O' : 'X';
    const winPlayer = lastPlayer === role ? name : opponent;
    return winPlayer;
  }

  return false;
}

export function validateMove(state, props, val) {
  const { role, gameId } = props;

  const {
    turn, opponent, winner, numOfPlays,
  } = state;

  if (winner || numOfPlays === 9) {
    return ('Please click \'Start another game\' to play again!');
  } else if (!opponent) {
    return (`Invite a friend! Your game id is: ${gameId}`);
  } else if (turn !== role) {
    return ('Please wait for your turn');
  } else if (val !== '') {
    return ('This spot as already been played. Please select again!');
  }

  return false;
}
