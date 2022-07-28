import {Cell, CellState} from './cell'
import {Coordinates, exists, Field, getNeighbors, isMine, isEmpty, isFlag, isHidden} from './helpers/field'

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
          mineField[i][j] = CellState.mine
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
        if (cell < CellState.mine - 1) {
          field[row][col] += 1
        }
      }
    })
    return field
  },
  /**
   * Given coordinates, playerField and gameField open cell at coordinates
   * Throws error if opened cell is a mine
   * Returns updated playerField
   * @param row
   * @param col
   * @param playerField
   * @param gameField
   * @returns Field
   */
  openCell: ([row, col]: Coordinates, playerField: Field, gameField: Field): Field => {
    const gameCell = gameField[row][col]
    playerField[row][col] = gameCell
    if (isMine(gameCell)) throw new Error('Game Over')
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
          if (gameCell < CellState.mine) {
            playerField[r][c] = gameCell
          }
        }
      })
    }
    return playerField
  },
  /**
   * Sets flag in field or throws error if max flags reached
   * @param coords
   * @param playerField
   * @param flagCount
   * @param mineCount
   * @returns [Field, number]
   *
   */
  setFlag: (coords: Coordinates, playerField: Field, flagCount: number, mineCount: number): [Field, number] => {
    const [row, col] = coords
    const cell = playerField[row][col]
    let flagDiff = 0
    const {flag, weakFlag, hidden} = CellState
    switch (cell) {
      case flag:
        playerField[row][col] = weakFlag
        break
      case weakFlag:
        flagDiff--
        playerField[row][col] = hidden
        break
      case hidden:
        if (flagCount === mineCount) throw new Error('Remove a flag to add a new one')
        playerField[row][col] = flag
        flagDiff++
        break
      default:
        return [playerField, flagDiff]
    }
    return [playerField, flagDiff]
  },
  /**
   * Detects if game is solved dependent on playerField and gameField
   * @param playerField
   * @param gameField
   * @returns boolean
   */
  detectSolved: (playerField: Field, gameField: Field): boolean => {
    const {flag, weakFlag} = CellState
    let [mineCount, flagCount, detectedMines, hiddenCount] = [0,0,0,0];
    for (const row of gameField.keys()) {
      for (const col of gameField[row].keys()) {
        const gameCell = gameField[row][col]
        const playerCell = playerField[row][col]
        const mineFound = isMine(gameCell)
        if (mineFound) {
          mineCount++
          if (isFlag(playerCell)) detectedMines++
        }
        if (isHidden(playerCell)) {
          hiddenCount++
        }
        if ([flag, weakFlag].includes(playerCell)) {
          flagCount++
        }
      }
    }
    return mineCount === detectedMines &&  hiddenCount === 0
  },
}
