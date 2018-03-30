const checkRow = (n, board, row) => {
  for (let i = 0; i < n - 1; i += 1) {
    if (!board[row][i] || (board[row][i] !== board[row][i + 1])) return false;
  }

  return true;     
}

const checkColumn = (n, board, col) => {
  for (let i = 0; i < n - 1; i += 1) {
    if (!board[i][col] || board[i][col] !== board[i + 1][col]) return false;
  }

  return true; 
}

const checkDiagonal = (n, board, row, col) => {
  
  let foundDiagonal = true;
  for (let i = 0; i < n - 1; i += 1) {
    if (!board[i][i] || board[i][i] !== board[i + 1][i + 1]) {
      foundDiagonal = false;
    }
  }
  
  if (foundDiagonal) return true;

  for (let i = 0, j = n - 1; i < n - 1; i += 1) {
    if (!board[i][j] || board[i][j] !== board[i + 1][j - 1]) return false;
    j -= 1;
  }
  
  return true;
}

const checkWinner = (n, board, row, col) => {
  return checkRow(n, board, row) || checkColumn(n, board, col) || checkDiagonal(n, board, row, col);
}

export { checkRow, checkColumn, checkDiagonal, checkWinner };
