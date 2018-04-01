import { updateOpponent, onWinUpdateScoreboard } from '../state-functions';

describe('update opponent state', () => {
  it('Should identify opponent if player is first player', () => {
    const players = ['jason', 'john'];
    const name = 'jason';
    const expected = 'john';
    const actual = updateOpponent(name, players);
    expect(actual).toBe(expected);
  });

  it('Should identify opponent if player is second player', () => {
    const players = ['jason', 'john'];
    const name = 'john';
    const expected = 'jason';
    const actual = updateOpponent(name, players);
    expect(actual).toBe(expected);
  });
});

describe('update winner count', () => {
  it('Should update userWins state if user wins', () => {
    const state = { 'name': 'jason', userWins: 0, opponentWins: 0};
    const winner = 'jason';
    const expected = { 'name': 'jason', userWins: 1, opponentWins: 0 }
    const actual = onWinUpdateScoreboard(state, winner);
    expect(actual).toEqual(expected);
  });

  it('Should update userWins state if opponent wins', () => {
    const state = { 'name': 'jason', userWins: 0, opponentWins: 0};
    const winner = 'john';
    const expected = { 'name': 'jason', userWins: 0, opponentWins: 1 }
    const actual = onWinUpdateScoreboard(state, winner);
    expect(actual).toEqual(expected);
  });
});
