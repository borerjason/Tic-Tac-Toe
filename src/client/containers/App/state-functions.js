export function updateOpponent(name, players) {
  return name === players[0] ? players[1] : players[0];
}

export function onWinUpdateScoreboard(state, winner) {
  const newState = { ...state };
  if (winner === newState.name) {
    newState.userWins += 1;
  } else {
    newState.opponentWins += 1;
  }

  return newState;
}
