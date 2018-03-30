import { checkRow, checkColumn, checkDiagonal, checkWinner } from '../../helpers/gameplay';


const n = 3;

describe('Should identify row winners', () => {
  it('should recognize a top row winner of Xs', () => {
    const board = [['X', 'X', 'X'], ['', '', ''], ['', '', '']]
    const row = 0;
    const actual = checkRow(n, board, row);
    expect(actual).toBe(true);
  });

  it('should return false if off by one row', () => {
    const board = [['X', 'X', 'X'], ['', '', ''], ['', '', '']]
    const row = 1;
    const actual = checkRow(n, board, row);
    expect(actual).toBe(false);
  });

  it('should return false if last value belongs to opponent', () => {
    const board = [['X', 'X', '0'], ['', '', ''], ['', '', '']]
    const row = 1;
    const actual = checkRow(n, board, row);
    expect(actual).toBe(false);
  });

  it('should recognize a top row winner of Os', () => {
    const board = [['O', 'O', 'O'], ['', '', ''], ['', '', '']]
    const row = 0;
    const actual = checkRow(n, board, row);
    expect(actual).toBe(true);
  });

  it('should recognize a middle row winner of Xs', () => {
    const board = [['', '', ''], ['X', 'X', 'X'], ['', '', '']]
    const row = 1;
    const actual = checkRow(n, board, row);
    expect(actual).toBe(true);
  });

  it('should recognize a bottom row winner of Xs', () => {
    const board = [['', '', ''], ['', '', ''], ['X', 'X', 'X']]
    const row = 2;
    const actual = checkRow(n, board, row);
    expect(actual).toBe(true);
  });

  it('should return false if only two X in a row', () => {
    const board = [['X', '', ''], ['X', '', ''], ['', '', '']]
    const row = 1;
    const actual = checkRow(n, board, row);
    expect(actual).toBe(false);
  })
});

describe('Should identify column winners', () => {
    it('should recognize a first column winner of Xs', () => {
      const board = [['X', '', ''], ['X', '', ''], ['X', '', '']]
      const col = 0;
      const actual = checkColumn(n, board, col);
      expect(actual).toBe(true);
    });
  
    it('should return false if off by one column', () => {
      const board = [['X', '', ''], ['X', '', ''], ['X', '', '']]
      const col = 1;
      const actual = checkColumn(n, board, col);
      expect(actual).toBe(false);
    });
  
    it('should recognize a second column winner of Xs', () => {
      const board = [['', 'X', ''], ['', 'X', ''], ['', 'X', '']]
      const col = 1;
      const actual = checkColumn(n, board, col);
      expect(actual).toBe(true);
    });
  
    it('should recognize a third column winner of Xs', () => {
      const board = [['', '', 'X'], ['', '', 'X'], ['', '', 'X']]
      const col = 2;
      const actual = checkColumn(n, board, col);
      expect(actual).toBe(true);
    });

    it('should return false if only two X in a row', () => {
      const board = [['X', '', ''], ['X', '', ''], ['', '', '']]
      const col = 0;
      const actual = checkColumn(n, board, col);
      expect(actual).toBe(false);
    })
  });
  
  describe('Should identify diagonal winners', () => {
    it('Should recognize a left -> right diagonal winner', () => {
      const board = [['X', '', ''], ['', 'X', ''], ['', '', 'X']]
      const col = 0;
      const row = 0;
      const actual = checkDiagonal(n, board, row, col);
      expect(actual).toBe(true);
    });

    it('Should recognize a right -> left diagonal winner', () => {
      const board = [['', '', 'X'], ['', 'X', ''], ['X', '', '']]
      const col = 2;
      const row = 0;
      const actual = checkDiagonal(n, board, row, col);
      expect(actual).toBe(true);
    });

  });

  describe('Should identify  winners', () => {
    it('Should recognize a row winner', () => {
      const board = [['X', 'X', 'X'], ['', '', ''], ['', '', '']]
      const col = 0;
      const row = 0;
      const actual = checkWinner(n, board, row, col);
      expect(actual).toBe(true);
    });

    it('Should recognize a column winner', () => {
      const board = [['X', '', ''], ['X', '', ''], ['X', '', '']]
      const col = 0;
      const row = 0;
      const actual = checkWinner(n, board, row, col);
      expect(
        actual).toBe(true);
    });

    it('Should recognize a diagonal winner', () => {
      const board = [['X', '', ''], ['', 'X', ''], ['', '', 'X']]
      const col = 0;
      const row = 0;
      const actual = checkWinner(n, board, row, col);
      expect(actual).toBe(true);
    });

  });