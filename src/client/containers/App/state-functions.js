export function updateOpponent(name, players) {
  return name === players[0] ? players[1] : players[0];
}

export function onWinUpdateScoreboard(state, winner) {
  const newState = {...state};
  winner === newState.name ? newState.userWins++ : newState.opponentWins++;
  return newState;
}
