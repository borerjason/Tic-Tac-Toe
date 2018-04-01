import { updateBoardState, validateMove } from '../state-functions';

describe('update board state', () => {
  it('Should identify opponent if player is first player', () => {
    const players = ['jason', 'john'];
    const name = 'jason';
    const expected = 'john';
    const actual = updateOpponent(name, players);
    expect(actual).toBe(expected);
  });
});
