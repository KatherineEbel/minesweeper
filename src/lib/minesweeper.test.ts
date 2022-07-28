import {Field} from './helpers/field'
import {CellState} from './cell'
import {MineSweeper} from './minesweeper'

const {detectSolved, setFlag} = MineSweeper
const {empty: e, mine: m, flag: f, hidden: h, weakFlag: w} = CellState

describe('minesweeper', function () {
  describe('setFlag', () => {
    test('flagging unhidden cell should be ignored', () => {
      const playerField: Field = [
        [1, h, h],
        [h, h, h],
        [h, h, h],
      ]
      const [actual, flagDiff] = setFlag([0, 0], playerField, 0, 2)
      expect(actual).toStrictEqual(playerField)
      expect(flagDiff).toEqual(0)
    })

    test('3x3 field after 1st click', () => {
      const playerField: Field = [
        [1, h, h],
        [h, h, h],
        [h, h, h],
      ]
      const [actual, flagDiff] = setFlag([1, 0], playerField, 0, 2)
      expect(flagDiff).toEqual(1)
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

      setFlag([1, 0], playerField, 0, 2)
      const [actual, flagDiff] = setFlag([1, 0], playerField, 1, 2)
      expect(flagDiff).toEqual(0)
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

      setFlag([1, 0], playerField, 0, 2)
      setFlag([1, 0], playerField, 1, 2)
      const [actual, flagDiff] = setFlag([1, 0], playerField, 1, 2)
      expect(flagDiff).toEqual(-1)
      expect(actual).toStrictEqual([
        [1, h, h],
        [10, h, h],
        [h, h, h],
      ])
    })

    test("number of flags can't exceed number of mines", () => {
      const playerField: Field = [
        [f,h,h],
        [h,h,h],
        [f,h,h],
      ]

      expect(() => {
        setFlag([1,0], playerField, 2, 2)
      }).toThrow()
    })

    test("can switch flag from hard to weak when max flags reached", () => {
      const playerField: Field = [
        [f,h,h],
        [h,h,h],
        [f,h,h],
      ]

      const [actual, flagDiff] = setFlag([0,0], playerField, 2, 2)
      expect(flagDiff).toEqual(0)
      expect(actual).toStrictEqual([
        [w,h,h],
        [h,h,h],
        [f,h,h],
      ])
    })

    test("can't add flag even if flags are weak when max flags reached", () => {
      const playerField: Field = [
        [w,h,h],
        [h,h,h],
        [w,h,h],
      ]

      expect(() => {
        setFlag([1,0], playerField, 2, 2)
      }).toThrow()
    })

    test("can add another flag after removing one", () => {
      const playerField: Field = [
        [w,h,h],
        [h,h,h],
        [w,h,h],
      ]

      setFlag([0,0], playerField, 2, 2)
      const [actual, flagDiff] = setFlag([1, 0], playerField, 1, 2)
      expect(flagDiff).toEqual(1)
      expect(actual).toStrictEqual([
        [h,h,h],
        [f,h,h],
        [w,h,h],
      ])
    })
  })

  describe('detectSolved', function () {
    describe('when solved', function () {

      test('3x3', () => {
        const gameField: Field = [
          [1, 1, e],
          [m, 1, e],
          [1, 1, e],
        ]

        const playerField: Field = [
          [1, 1, e],
          [f, 1, e],
          [1, 1, e],
        ]

        const solved = detectSolved(playerField, gameField)
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

        const solved = detectSolved(playerField, gameField)
        expect(solved).toBe(true)
      })
    })

    describe('not solved', function () {
      test('3x3', () => {
        const gameField: Field = [
          [1, 1, e],
          [m, 1, e],
          [1, 1, e],
        ]

        const playerField: Field = [
          [1, 1, h],
          [h, 1, h],
          [1, 1, h],
        ]

        const solved = detectSolved(playerField, gameField)
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

        const solved = detectSolved(playerField, gameField)
        expect(solved).toBe(false)
      })
    })

  })
})