import {act, renderHook} from '@testing-library/react'
import {useGame} from './useGame'
import {GameLevels} from '../lib/game'

jest.mock('../lib/minesweeper')

const [beginner, intermediate, expert] = GameLevels

/**
 * extract specific cells from field
 * @param field
 * @param cell
 */

describe('useGame', () => {
  test('initial state', () => {
    const {result} = renderHook(useGame)
    const {level, won, playerField} = result.current
    expect({level, won, playerField}).toStrictEqual({
      level: beginner,
      won: null,
      playerField: Array(9).fill(Array(9).fill(10))
    })
  })

  test('change game level', () => {
    const {result} = renderHook(useGame)
    const {playerField: beginnerField, onChangeLevel} = result.current
    expect(beginnerField).toHaveLength(9)
    act(() => onChangeLevel(intermediate))
    const {playerField: intermediateField} = result.current
    expect(intermediateField).toHaveLength(16)
    act(() => onChangeLevel(expert))
    const {playerField: expertField} = result.current
    expect(expertField).toHaveLength(22)
  })
})