import { Cell, CellState, Coordinates, Field, Neighbors } from '../types'

export const isActive = (cell: Cell): boolean => {
  return [CellState.hidden, CellState.flag, CellState.weakFlag].includes(cell)
}

const isBomb = (cell: Cell): boolean => cell === CellState.bomb
const isEmpty = (cell: Cell): boolean => cell === CellState.empty
const isHidden = (cell: Cell): boolean => cell === CellState.hidden

export const exists = ([row, col]: Coordinates, field: Field): boolean => {

  return field[row] !== undefined && field[row][col] !== undefined
}

export const getNeighbors = ([row, col]: Coordinates): Neighbors => {
  return {
    top: [row - 1, col],
    topRight: [row - 1, col + 1],
    right: [row, col + 1],
    rightBottom: [row + 1, col + 1],
    bottom: [row + 1, col],
    bottomLeft: [row + 1, col - 1],
    left: [row, col - 1],
    leftTop: [row - 1, col - 1],
  }
}

export const MineSweeper = {
  buildEmpty: (size: number, state: Cell = CellState.empty): Field => {
    return new Array(size).fill(null).map(() => new Array(size).fill(state))
  },
  buildField: (size: number, probability: number): Field => {
    if (probability < 0 || probability > 1)
      throw new Error('Density must be between 0 and 1')

    let unprocessedCells = size * size
    let restCellsWithBombs = unprocessedCells * probability
    const mineField = MineSweeper.buildEmpty(size)

    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        if (restCellsWithBombs === 0) return mineField
        if (restCellsWithBombs / unprocessedCells > Math.random()) {
          mineField[i][j] = CellState.bomb
          MineSweeper.incrementNeighbors([i, j], mineField)
          restCellsWithBombs--
        }
        unprocessedCells--
      }
    }
    return mineField
  },
  incrementNeighbors: (coords: Coordinates, field: Field): Field => {
    const neighbors = getNeighbors(coords)
    Object.values(neighbors).forEach((coords) => {
      const [row, col] = coords
      if (exists(coords, field)) {
        const cell: Cell = field[row][col]
        if (cell < CellState.bomb - 1) {
          field[row][col] += 1
        }
      }
    })
    return field
  },
  openCell: ([row, col]: Coordinates, playerField: Field, gameField: Field): Field => {
    const gameCell = gameField[row][col]
    if (isBomb(gameCell)) throw new Error('Game Over')
    if (isEmpty(gameCell)) {
      playerField[row][col] = gameCell
      const neighbors = getNeighbors([row,col])
      Object.values(neighbors).forEach(neighbor => {
        if (exists(neighbor, gameField)) {
          const [r, c] = neighbor
          const gameCell = gameField[r][c]
          const playerCell = playerField[r][c]
          if (isEmpty(gameCell) && isHidden(playerCell)) {
            playerField = MineSweeper.openCell(neighbor, playerField, gameField)
          }
          if (gameCell < CellState.bomb) {
            playerField[r][c] = gameCell
          }
        }
      })
    }
    playerField[row][col] = gameCell
    return playerField
  },
}
