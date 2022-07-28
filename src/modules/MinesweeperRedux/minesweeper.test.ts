import {CellState} from 'lib/cell'
import {GameSettings} from 'lib/game'
import {reducer, actions, State} from 'modules/MinesweeperRedux/minesweeper'

const {hidden: h, flag: f, weakFlag: w} = CellState

describe('Minesweeper reducer', function () {
  const level = 'beginner'
  const initialState: State = {
    error: null,
    playing: false,
    level,
    seconds: 0,
    won: null,
    mines: 1,
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

  describe('setFlag action', function () {
    test('flagging hidden cell multiple times', () => {
      let actual = reducer(initialState, actions.setFlag([1, 1]))
      expect(actual).toEqual({
        ...actual,
        playing: true,
        flagCounter: 1,
        playerField: [
          [h,h],
          [h,f],
        ],
      })
      actual = reducer(actual, actions.setFlag([1, 1]))
      expect(actual).toEqual({
        ...actual,
        playing: true,
        flagCounter: 1,
        playerField: [
          [h,h],
          [h,w],
        ],
      })

      actual = reducer(actual, actions.setFlag([1, 1]))
      expect(actual).toEqual({
        ...actual,
        playing: true,
        flagCounter: 0,
        playerField: [
          [h,h],
          [h,h],
        ],
      })
    })
  })

  describe('end of game', () => {
    test('when solved', () => {
      let actual = reducer(initialState, actions.openCell([1,0]))
      actual = reducer(actual, actions.openCell([0,1]))
      actual = reducer(actual, actions.openCell([1,1]))
      actual = reducer(actual, actions.setFlag([0,0]))

      expect(actual).toEqual({
        ...initialState,
        won: true,
        playing: false,
        flagCounter: 1,
        playerField: initialState.gameField
      })

    })
  })

  describe('reset', function () {
    test('resetting game sets game to default state', () => {
      const nextState = reducer(initialState, actions.reset())
      expect(nextState).toEqual(
        expect.objectContaining({
          error: null,
          level,
          seconds: 0,
          mines: 10,
          won: null,
          settings: [9, 10],
          flagCounter: 0,
        })
      )
      expect(nextState.gameField).toHaveLength(9)
      expect(nextState.playerField).toHaveLength(9)
    })

    test('changing level to intermediate updates level and settings', () => {
      const level = 'intermediate'
      const nextState = reducer(initialState, actions.changeLevel(level))
      expect(nextState).toEqual(
        expect.objectContaining({
          error: null,
          level,
          seconds: 0,
          mines: 44,
          won: null,
          settings: [16, 44],
          flagCounter: 0,
        })
      )
      expect(nextState.gameField).toHaveLength(16)
      expect(nextState.playerField).toHaveLength(16)
    })

    test('changing level to expert updates level and settings', () => {
      const level = 'expert'
      const nextState = reducer(initialState, actions.changeLevel(level))
      expect(nextState).toEqual(
        expect.objectContaining({
          error: null,
          level,
          seconds: 0,
          mines: 99,
          won: null,
          settings: [22, 99],
          flagCounter: 0,
        })
      )
      expect(nextState.gameField).toHaveLength(22)
      expect(nextState.playerField).toHaveLength(22)
    })
  })
})
