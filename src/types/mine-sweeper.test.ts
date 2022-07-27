import {Field} from '../helpers/field'
import {CellState} from './cell'
import { MineSweeper } from './minesweeper'

const { setFlag } = MineSweeper
const {hidden: h} = CellState

describe('minesweeper', function () {
  describe('setFlag', () => {
    test('setting flag to unhidden cell should be ignored', () => {
      const playerField: Field = [
        [1, h, h],
        [h, h, h],
        [h, h, h],
      ]
      const actual = setFlag([0,0], playerField)
      expect(actual).toStrictEqual(playerField)
    })

    test('3x3 field after 1st click', () => {
      const playerField: Field = [
        [1, h, h],
        [h, h, h],
        [h, h, h],
      ]
      const actual = setFlag([1,0], playerField)
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

      setFlag([1,0], playerField)
      const actual = setFlag([1,0], playerField)
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

      setFlag([1,0], playerField)
      setFlag([1,0], playerField)
      const actual = setFlag([1,0], playerField)
      expect(actual).toStrictEqual([
        [1, h, h],
        [10, h, h],
        [h, h, h],
      ])
    })

  })
})