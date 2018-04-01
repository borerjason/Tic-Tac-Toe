import { winningPlayer, validateMove } from '../state-functions';

describe('Should return winning player', () => {
  it(`Should return winner is user after turn`, () => {
    const data = {turn: 'O', winner: true};
    const props = { role: 'X', name: 'jason', opponent: 'john'};
    const expected = 'jason';
    const actual = winningPlayer(data, props);
    
    expect(actual).toBe(expected);
  });

  it(`Should return winner if opponent wins`, () => {
    const data = {turn: 'X', winner: true};
    const props = { role: 'X', name: 'jason', opponent: 'john'};
    const expected = 'john';
    const actual = winningPlayer(data, props);

    expect(actual).toBe(expected);
  });

  it(`Should return false if there is no winner`, () => {
    const data = {turn: 'O', winner: false};
    const props = { role: 'X', name: 'jason', opponent: 'john'};
    const expected = 'jason';
    const actual = winningPlayer(data, props);

    expect(actual).toBe(false);
  });
});

describe('Should validate move', () => {
  it(`Should throw warning if player tries to play after a player won`, () => {
    const state = {turn: 'X', opponent:'john', winner: true,  numOfPlays: 6};
    const role = { role: 'X'};
    const val = '';
    const expected = 'string'
    const actual = typeof validateMove(state, role, val);
    
    expect(actual).toBe(expected);
  });

  it(`Should throw warning if player tries to play out of turn`, () => {
    const state = {turn: 'O', opponent:'john', winner: false,  numOfPlays: 6};
    const role = { role: 'X'};
    const val = '';
    const expected = 'string'
    const actual = typeof validateMove(state, role, val);

    expect(actual).toBe(expected);
  });

  it(`Should throw warning if spot has already been played`, () => {
    const state = {turn: 'O', opponent:'john', winner: false,  numOfPlays: 6};
    const role = { role: 'O'};
    const val = 'X';
    const expected = 'string'
    const actual = typeof validateMove(state, role, val);

    expect(actual).toBe(expected);
  });

  it(`Should throw warning if game is tied`, () => {
    const state = {turn: 'O', opponent:'john', winner: false,  numOfPlays: 9};
    const role = { role: 'O'};
    const val = '';
    const expected = 'string'
    const actual = typeof validateMove(state, role, val);

    expect(actual).toBe(expected);
  });

  it(`Should return false if play is valid`, () => {
    const state = {turn: 'O', opponent:'john', winner: false,  numOfPlays: 6};
    const role = { role: 'O'};
    const val = '';
    const expected = false;
    const actual = validateMove(state, role, val);

    expect(actual).toBe(expected);
  });

});
