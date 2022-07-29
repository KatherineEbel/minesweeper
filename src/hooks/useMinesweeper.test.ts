import {act, renderHook} from '@testing-library/react'
import {GameLevels} from 'lib/game'
import {useMinesweeper} from './useMinesweeper'

jest.mock('lib/minesweeper')

const [beginner, intermediate, expert] = GameLevels

/**
 * extract specific cells from field
 * @param field
 * @param cell
 */

describe('useGame', () => {
  test('initial state', () => {
    const {result} = renderHook(useMinesweeper)
    const {level, won, playerField} = result.current
    expect({level, won, playerField}).toStrictEqual({
      level: beginner,
      won: null,
      playerField: Array(9).fill(Array(9).fill(10))
    })
  })

  test('change game level', () => {
    const {result} = renderHook(useMinesweeper)
    const {playerField: beginnerField, onChangeLevel} = result.current
    expect(beginnerField).toHaveLength(9)
    act(() => onChangeLevel(intermediate))
    const {playerField: intermediateField} = result.current
    expect(intermediateField).toHaveLength(16)
    act(() => onChangeLevel(expert))
    const {playerField: expertField} = result.current
    expect(expertField).toHaveLength(22)
  })

  test('timer should start when clicking cell', () => {
    jest.useFakeTimers()
    const {result} = renderHook(useMinesweeper)
    const timeToPass = 5
    act(() => {
      jest.advanceTimersByTime(5000)
    })
    expect(result.current.seconds).toBe(0)
    act(() => result.current.onSelectCell([0,0]))
    act(() => {
      jest.advanceTimersByTime(5000)
    })
    expect(result.current.seconds).toBe(timeToPass)
  })

  test('timer should start when flagging cell', () => {
    jest.useFakeTimers()
    const {result} = renderHook(useMinesweeper)
    const timeToPass = 5
    act(() => {
      jest.advanceTimersByTime(5000)
    })
    expect(result.current.seconds).toBe(0)
    act(() => result.current.onFlagCell([0,0]))
    act(() => {
      jest.advanceTimersByTime(5000)
    })
    expect(result.current.seconds).toBe(timeToPass)
  })
})