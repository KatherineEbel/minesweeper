import {CellState} from 'lib/cell'
import {GameSettings} from 'lib/game'
import {Field} from 'lib/helpers/field'
import {reducer, actions, State, runTimer, updateTime} from 'modules/MinesweeperRedux/minesweeper'

const {hidden: h, flag: f, weakFlag: w} = CellState

describe('Minesweeper reducer', function () {
  const level = 'beginner'
  const initialState: State = {
    error: null,
    playing: false,
    level,
    seconds: 0,
    timerStarted: false,
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

  describe('reset and change level', function () {
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

  describe('update time action', () => {

    test('update seconds from 0', () => {
      expect(reducer({...initialState, seconds: 0}, actions.updateTime()))
        .toEqual(expect.objectContaining({seconds: 1}))
    })

    test('update seconds from 10', () => {
      expect(reducer({...initialState, seconds: 10}, actions.updateTime()))
        .toEqual(expect.objectContaining({seconds: 11}))
    })
  })

  describe('runTimer thunk', () => {
    test('when should start', () => {
      const mockDispatch = jest.fn()
      runTimer()(
        mockDispatch,
        () => ({
          minesweeper: {
            playing: true,
            seconds: 0
          } as State
        }),
        undefined
      )
      expect(mockDispatch).toHaveBeenCalled()
    })

    test("when timer already running", () => {
      const mockDispatch = jest.fn()
      runTimer()(
        mockDispatch,
        () => ({
          minesweeper: {
            playing: true,
            timerStarted:true
          } as State
        }),
        undefined
      )
      expect(mockDispatch).not.toHaveBeenCalled()
    })

    test("when player starts and timer not started", () => {
      const mockDispatch = jest.fn()
      runTimer()(
        mockDispatch,
        () => ({
          minesweeper: {
            playing: true,
            timerStarted:false
          } as State
        }),
        undefined
      )
      expect(mockDispatch).toHaveBeenCalled()
    })

    test("when timer is not started and not playing", () => {
      const mockDispatch = jest.fn()
      runTimer()(
        mockDispatch,
        () => ({
          minesweeper: {
            playing: false,
            timerStarted: false
          } as State
        }),
        undefined
      )
      expect(mockDispatch).not.toHaveBeenCalled()
    })
  })

  describe('updateTime thunk', () => {
    test('when playing game and timer started', () => {
      jest.useFakeTimers()
      const mockDispatch = jest.fn()
      const gameField: Field = [[]]
      updateTime(gameField)(
        mockDispatch,
        () => ({
          minesweeper: {
            gameField,
            playing: true,
            timerStarted: true
          } as State
        }),
        undefined
      )
      jest.advanceTimersByTime(1000)
      expect(mockDispatch).toHaveBeenCalledTimes(2)
    })

    test('when not playing game', () => {
      jest.useFakeTimers()
      const mockDispatch = jest.fn()
      const gameField: Field = [[]]
      updateTime(gameField)(
        mockDispatch,
        () => ({
          minesweeper: {
            gameField,
            playing: false,
            timerStarted: false
          } as State
        }),
        undefined
      )
      jest.advanceTimersByTime(1000)
      expect(mockDispatch).not.toHaveBeenCalled()
    })

    test("update time with when game reset", () => {
      jest.useFakeTimers()
      const mockDispatch = jest.fn()
      updateTime(initialState.gameField)(
        mockDispatch,
        () => ({
          minesweeper: {
            gameField: {...initialState.gameField}
          } as State
        }),
        undefined
      )
      jest.advanceTimersByTime(1000)
      expect(mockDispatch).toHaveBeenCalledTimes(0)
    })
  })
})
