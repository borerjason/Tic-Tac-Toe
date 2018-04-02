import { checkWinner } from '../gameplay';

const onMoveUpdateBoard = (board, turn, numOfPlays, winner, loc, role, n) => {
  const newTurn = turn === 'X' ? 'O' : 'X';
  const newBoard = [...board];
  let updateWinner = winner;
  let playCount = numOfPlays;
  newBoard[loc[0]][loc[1]] = role;
  playCount += 1;

  if (playCount > 4) {
    updateWinner = checkWinner(n, board, loc[0], loc[1]);
  }

  return [newBoard, newTurn, playCount, updateWinner];
};

export default onMoveUpdateBoard;
