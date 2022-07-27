import { Cell, CellState } from '../types/cell'

export type Field = Cell[][]
export type Coordinates = [number, number]
export type Neighbors = {
  top: Coordinates
  topRight: Coordinates
  right: Coordinates
  rightBottom: Coordinates
  bottom: Coordinates
  bottomLeft: Coordinates
  left: Coordinates
  leftTop: Coordinates
}

export const isActive = (cell: Cell): boolean => {
  return [CellState.hidden, CellState.flag, CellState.weakFlag].includes(cell)
}

export const isBomb = (cell: Cell): boolean => cell === CellState.bomb
export const isEmpty = (cell: Cell): boolean => cell === CellState.empty
export const isHidden = (cell: Cell): boolean => cell === CellState.hidden

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
