import {CellState} from 'lib/cell'
import {GameSettings} from 'lib/game'
import {reducer, actions, State} from 'modules/MinesweeperRedux/minesweeper'

const {hidden: h, flag: f} = CellState

describe('Minesweeper reducer', function () {
  const level = 'beginner'
  const initialState: State = {
    error: null,
    playing: false,
    level,
    seconds: 0,
    won: null,
    mines: 0,
    settings: GameSettings[level],
    flagCounter: 0,
    playerField: [
      [h, h],
      [h, h],
    ],
    gameField: [
      [9, 1],
      [1, 1],
    ]
  }

  describe('openCell action', function () {
    test('player field updated when opening hidden cell with number', () => {
      expect(reducer(initialState, actions.openCell([1, 1]))).toEqual({
        ...initialState,
        playing: true,
        playerField: [
          [h, h],
          [h, 1],
        ],
      })
    })

    test('opening cell with mine', () => {
      expect(reducer(initialState, actions.openCell([0, 0]))).toEqual({
        ...initialState,
        playing: false,
        won: false,
        playerField: initialState.gameField,
        error: 'Game Over'
      })
    })

    test('opening cell with mine', () => {
      expect(reducer(initialState, actions.openCell([0, 0]))).toEqual({
        ...initialState,
        playing: false,
        won: false,
        playerField: initialState.gameField,
      })
    })

    test('opening cell with mine', () => {
      expect(reducer(initialState, actions.openCell([0, 0]))).toEqual({
        ...initialState,
        playing: false,
        won: false,
        playerField: initialState.playerField,
      })
    })

    test('opening cell with flag', () => {
      expect(reducer({
        ...initialState, playerField: [
          [h, h,],
          [h, f],
        ]
      }, actions.openCell([1, 1]))).toEqual({
        ...initialState,
        playing: true,
        playerField: [
          [h, h],
          [h, f],
        ],
      })
    })
  })
})
