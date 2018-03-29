const checkRow = (n, board, row) => { // 1
  for (let i = 0; i < n - 1; i += 1) {
    if (board[row][i] !== board[row][i + 1]) return false;
  }

  return true;    
    
}

const checkColumn = (n, board, col) => {
  for (let i = 0; i < n - 1; i += 1) {
    if (board[i][col] !== board[i][col]) return false;
  }

  return true; 
}

const checkDiagonal = (board, row, col) => {
  for (let i = 0; i < n - 1; i += 1) {
    if (board[i][i] !== board[i + 1][i + 1]) return false;
  }

  for (let j = n - 1; i > 0; i -= 1) {
    if (board[i][i] !== board[i - 1][i - 1]) return false;
  }

  return true;
}