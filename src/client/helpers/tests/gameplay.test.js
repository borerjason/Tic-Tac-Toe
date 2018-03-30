import { checkRow, checkColumn, checkDiagonal, checkWinner } from '../../helpers/gameplay';


const n = 3;

describe('Gameplay helpers', () => {
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
});