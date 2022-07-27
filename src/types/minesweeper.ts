import {Cell, CellState} from './cell'
import {Coordinates, exists, Field, getNeighbors, isBomb, isEmpty, isFlag, isHidden} from '../helpers/field'

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
    playerField[row][col] = gameCell
    if (isBomb(gameCell)) throw new Error('Game Over')
    if (isEmpty(gameCell)) {
      const neighbors = getNeighbors([row, col])
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
    return playerField
  },
  /**
   *
   * @param coords
   * @param playerField
   */
  setFlag: (coords: Coordinates, playerField: Field): Field => {
    const [row, col] = coords
    const cell = playerField[row][col]
    const {flag, weakFlag, hidden} = CellState
    switch (cell) {
      case flag:
        playerField[row][col] = weakFlag
        break
      case weakFlag:
        playerField[row][col] = hidden
        break
      case hidden:
        playerField[row][col] = flag
        break
      default:
        return playerField
    }
    return playerField
  },
  /**
   *
   * @param playerField
   * @param gameField
   * @returns [boolean, number]
   */
  detectSolved: (playerField: Field, gameField: Field): [boolean, number] => {
    const {flag, weakFlag} = CellState
    let [bombCount, flagCount, detectedBombs, hiddenCount] = [0,0,0,0];
    for (const row of gameField.keys()) {
      for (const col of gameField[row].keys()) {
        const gameCell = gameField[row][col]
        const playerCell = playerField[row][col]
        const bombFound = isBomb(gameCell)
        if (bombFound) {
          bombCount++
          if (isFlag(playerCell)) detectedBombs++
        }
        if (isHidden(playerCell)) {
          hiddenCount++
        }
        if ([flag, weakFlag].includes(playerCell)) {
          flagCount++
        }
      }
    }
    const solved = bombCount === detectedBombs &&  hiddenCount === 0
    return [solved, flagCount]
  },
}
