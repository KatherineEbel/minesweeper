import {Field} from '../helpers/field'
import {CellState} from './cell'
import {MineSweeper} from './minesweeper'

const {detectSolved, setFlag} = MineSweeper
const {empty: e, bomb: b, flag: f, hidden: h} = CellState

describe('minesweeper', function () {
  describe('setFlag', () => {
    test('setting flag to unhidden cell should be ignored', () => {
      const playerField: Field = [
        [1, h, h],
        [h, h, h],
        [h, h, h],
      ]
      const actual = setFlag([0, 0], playerField)
      expect(actual).toStrictEqual(playerField)
    })

    test('3x3 field after 1st click', () => {
      const playerField: Field = [
        [1, h, h],
        [h, h, h],
        [h, h, h],
      ]
      const actual = setFlag([1, 0], playerField)
      expect(actual).toStrictEqual([
        [1, h, h],
        [11, h, h],
        [h, h, h],
      ])
    })

    test('3x3 field after 2nd click', () => {
      const playerField: Field = [
        [1, h, h],
        [h, h, h],
        [h, h, h],
      ]

      setFlag([1, 0], playerField)
      const actual = setFlag([1, 0], playerField)
      expect(actual).toStrictEqual([
        [1, h, h],
        [12, h, h],
        [h, h, h],
      ])
    })

    test('3x3 field after 3rd click', () => {
      const playerField: Field = [
        [1, h, h],
        [h, h, h],
        [h, h, h],
      ]

      setFlag([1, 0], playerField)
      setFlag([1, 0], playerField)
      const actual = setFlag([1, 0], playerField)
      expect(actual).toStrictEqual([
        [1, h, h],
        [10, h, h],
        [h, h, h],
      ])
    })

  })

  describe('detectSolved', function () {
    describe('when solved', function () {

      test('3x3', () => {
        const gameField: Field = [
          [1, 1, e],
          [b, 1, e],
          [1, 1, e],
        ]

        const playerField: Field = [
          [1, 1, e],
          [f, 1, e],
          [1, 1, e],
        ]

        const [solved, flagCount] = detectSolved(playerField, gameField)
        expect(flagCount).toBe(1)
        expect(solved).toBe(true)
      })

      test('5x5', () => {
        const gameField: Field = [
          [9, 9, 1, 1, 2],
          [9, 3, 1, 0, 0],
          [1, 1, 0, 1, 1],
          [1, 0, 0, 1, 9],
          [2, 1, 0, 1, 0]
        ]

        const playerField: Field = [
          [f, f, 1, 1, 2],
          [f, 3, 1, 0, 0],
          [1, 1, 0, 1, 1],
          [1, 0, 0, 1, f],
          [2, 1, 0, 1, 0]
        ]

        const [solved, flagCount] = detectSolved(playerField, gameField)
        expect(flagCount).toBe(4)
        expect(solved).toBe(true)
      })
    })

    describe('not solved', function () {
      test('3x3', () => {
        const gameField: Field = [
          [1, 1, e],
          [b, 1, e],
          [1, 1, e],
        ]

        const playerField: Field = [
          [1, 1, h],
          [h, 1, h],
          [1, 1, h],
        ]

        const [solved, flagCount] = detectSolved(playerField, gameField)
        expect(flagCount).toBe(0)
        expect(solved).toBe(false)
      })

      test('5x5', () => {
        const gameField: Field = [
          [9, 9, 1, 1, 2],
          [9, 3, 1, 0, 0],
          [1, 1, 0, 1, 1],
          [1, 0, 0, 1, 9],
          [2, 1, 0, 1, 0]
        ]

        const playerField: Field = [
          [f, f, 1, h, h],
          [f, 3, 1, h, h],
          [1, 1, h, h, h],
          [1, h, h, h, h],
          [2, h, h, h, h]
        ]

        const [solved, flagCount] = detectSolved(playerField, gameField)
        expect(flagCount).toBe(3)
        expect(solved).toBe(false)
      })
    })

  })
})