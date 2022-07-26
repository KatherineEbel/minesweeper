import { Cell, CellState, Field } from '../types'
import { getNeighbors, MineSweeper } from './field'

const { empty, hidden, bomb } = CellState

function partitionField(field: Field) {
  const flatField = field.flat()
  return flatField.reduce(
    (acc, cell: Cell) => {
      if (cell === bomb) {
        acc.bombCells.push(cell)
      } else {
        acc.emptyCells.push(cell)
      }
      return acc
    },
    {
      bombCells: [] as Cell[],
      emptyCells: [] as Cell[],
    },
  )
}

describe('MineField', () => {
  describe('incrementNeighbors', function () {
    test('field with only one item', () => {
      expect(MineSweeper.incrementNeighbors([0, 0], [[bomb]])).toStrictEqual([
        [bomb],
      ])
    })

    test('field 2x2 with one mine', () => {
      expect(
        MineSweeper.incrementNeighbors(
          [0, 0],
          [
            [bomb, empty],
            [empty, empty],
          ],
        ),
      ).toStrictEqual([
        [bomb, 1],
        [1, 1],
      ])
    })

    test('field 2x2 with two mines', () => {
      expect(
        MineSweeper.incrementNeighbors(
          [0, 0],
          [
            [bomb, empty],
            [empty, bomb],
          ],
        ),
      ).toStrictEqual([
        [bomb, 1],
        [1, bomb],
      ])
    })
  })

  describe('getNeighbors', () => {
    test('with [0, 0] coordinates', () => {
      expect(getNeighbors([0, 0])).toStrictEqual({
        top: [-1, 0],
        topRight: [-1, 1],
        right: [0, 1],
        rightBottom: [1, 1],
        bottom: [1, 0],
        bottomLeft: [1, -1],
        left: [0, -1],
        leftTop: [-1, -1],
      })
    })

    test('with [3, 3] coordinates', () => {
      expect(getNeighbors([3, 3])).toStrictEqual({
        top: [2, 3],
        topRight: [2, 4],
        right: [3, 4],
        rightBottom: [4, 4],
        bottom: [4, 3],
        bottomLeft: [4, 2],
        left: [3, 2],
        leftTop: [2, 2],
      })
    })
  })

  describe('Empty Field', () => {
    it('2x2', function () {
      const actual = MineSweeper.buildEmpty(2)
      expect(actual).toStrictEqual([
        [empty, empty],
        [empty, empty],
      ])
    })

    it('3x3', function () {
      const actual = MineSweeper.buildEmpty(3, hidden)
      expect(actual).toStrictEqual([
        [hidden, hidden, hidden],
        [hidden, hidden, hidden],
        [hidden, hidden, hidden],
      ])
    })

    it('3x3 with hidden state', function () {
      const actual = MineSweeper.buildEmpty(3)
      expect(actual).toStrictEqual([
        [empty, empty, empty],
        [empty, empty, empty],
        [empty, empty, empty],
      ])
    })
  })

  describe('Build Field', function () {
    it('should throw error when bad input for density', function () {
      const errorText = 'Density must be between 0 and 1'
      expect(() => MineSweeper.buildField(1, -1)).toThrow(errorText)
      expect(() => MineSweeper.buildField(1, 2)).toThrow(errorText)
    })

    test('smallest possible field without mine', function () {
      expect(MineSweeper.buildField(1, 0)).toStrictEqual([[empty]])
    })

    test('big field without mine', function () {
      expect(MineSweeper.buildField(10, 0)).toStrictEqual([
        Array(10).fill(empty),
        Array(10).fill(empty),
        Array(10).fill(empty),
        Array(10).fill(empty),
        Array(10).fill(empty),
        Array(10).fill(empty),
        Array(10).fill(empty),
        Array(10).fill(empty),
        Array(10).fill(empty),
        Array(10).fill(empty),
      ])
    })

    test('smallest possible field with mine', () => {
      expect(MineSweeper.buildField(1, 1)).toStrictEqual([[bomb]])
    })

    test('2x2 with mines', () => {
      expect(MineSweeper.buildField(2, 1)).toStrictEqual([
        [bomb, bomb],
        [bomb, bomb],
      ])
    })

    test('2x2 with 50% probability', () => {
      const size = 2
      const mines = 2
      const probability = mines / (size * size)
      const mineField = MineSweeper.buildField(size, probability)
      const { bombCells, emptyCells } = partitionField(mineField)
      expect(bombCells).toHaveLength(2)
      expect(emptyCells).toHaveLength(2)
      expect(emptyCells).toStrictEqual([2, 2])
    })

    test('10x10 with 25% probability', () => {
      const size = 10
      const mines = 25
      const probability = mines / (size * size)
      const mineField = MineSweeper.buildField(size, probability)
      const flatField = mineField.flat()
      expect(flatField.filter((cell) => cell === bomb)).toHaveLength(25)
    })
  })

  describe('openCell', function () {
    describe('losing', () => {
      test('open cell with bomb', () => {
        const playerField = [
          [hidden, hidden],
          [hidden, hidden],
        ]
        const gameField: Field = [
          [1, 1],
          [1, bomb],
        ]
        expect(() => MineSweeper.openCell([1,1], playerField, gameField)).toThrow('Game Over')
      })
    })

    describe('open cell with number', () => {
      test('open cell with CellState 1', () => {
        const playerField = [
          [hidden, hidden, hidden],
          [hidden, hidden, hidden],
          [hidden, hidden, hidden],
        ]
        const gameField: Field = [
          [1, 1, 0],
          [9, 1, 0],
          [1, 1, 0],
        ]

        const actual = MineSweeper.openCell([1,1], playerField, gameField)
        expect(actual).toStrictEqual([
          [hidden, hidden, hidden],
          [hidden, 1, hidden],
          [hidden, hidden, hidden],
        ])
      })
      test('open cell with CellState 3', () => {
        const playerField = [
          [hidden, hidden, hidden],
          [hidden, hidden, hidden],
          [hidden, hidden, hidden],
        ]
        const gameField: Field = [
          [9, 2, 0],
          [9, 3, 0],
          [9, 2, 0],
        ]

        const actual = MineSweeper.openCell([1,1], playerField, gameField)
        expect(actual).toStrictEqual([
          [hidden, hidden, hidden],
          [hidden, 3, hidden],
          [hidden, hidden, hidden],
        ])
      })
    })

    describe('open empty cell', () => {
      test('3x3 field', () => {
        const playerField = [
          [hidden, hidden, hidden],
          [hidden, hidden, hidden],
          [hidden, hidden, hidden],
        ]
        const gameField: Field = [
          [1, 1, 0],
          [9, 1, 0],
          [1, 1, 0],
        ]
        const actual = MineSweeper.openCell([1,2], playerField, gameField)
        expect(actual).toStrictEqual([
          [hidden, 1, 0],
          [hidden, 1, 0],
          [hidden, 1, 0],
        ])
      })

      test('5x5 field', () => {
        const playerField = [
          [hidden, hidden, hidden, hidden, hidden],
          [hidden, hidden, hidden, hidden, hidden],
          [hidden, hidden, hidden, hidden, hidden],
          [hidden, hidden, hidden, hidden, hidden],
          [hidden, hidden, hidden, hidden, hidden],
        ]
        const gameField: Field = [
          [9, 9, 1, 1, 0],
          [9, 3, 1, 0, 0],
          [1, 1, 0, 1, 1],
          [0, 0, 0, 1, 9],
          [0, 0, 0, 1, 1]
        ]
        const actual = MineSweeper.openCell([2, 2], playerField, gameField)
        expect(actual).toStrictEqual([
          [hidden, hidden, 1, 1, 0],
          [hidden, 3, 1, 0, 0],
          [1, 1, 0, 1, 1],
          [0, 0, 0, 1, hidden],
          [0, 0, 0, 1, hidden],
        ])
      })
    })
  })
})
