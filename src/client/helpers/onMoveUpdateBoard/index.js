import { checkWinner } from '../gameplay'

const onMoveUpdateBoard = (board, turn, numOfPlays, winner, loc, role, n) => {
  const newBoard = [...board];
  newBoard[loc[0]][loc[1]] = role;
  turn = turn === 'X' ? 'O' : 'X';
  numOfPlays += 1;

  if (numOfPlays > 4) {
    winner = checkWinner(n, board, loc[0], loc[1]);
  }

  return [newBoard, turn, numOfPlays, winner];
}

export default onMoveUpdateBoard;
