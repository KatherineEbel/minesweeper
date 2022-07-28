import {AnyAction, Reducer} from '@reduxjs/toolkit'
import {CellState} from 'lib/cell'
import {Coordinates, Field} from 'lib/helpers/field'
import {GameSettings, Level, Settings} from 'lib/game'
import {MineSweeper} from 'lib/minesweeper'

export interface State {
  error: string | null
  level: Level
  playing: boolean
  seconds: number
  mines: number
  won: boolean | null
  settings: Settings
  playerField: Field
  gameField: Field
  flagCounter: number
}

export const getInitialState = (): State => {
  const level = 'beginner'
  const settings = GameSettings[level]
  const [size, mines] = settings

  return {
    error: null,
    level,
    playing: false,
    seconds: 0,
    mines,
    won: null,
    settings,
    flagCounter: 0,
    playerField: MineSweeper.buildEmpty(size, CellState.hidden),
    gameField: MineSweeper.buildField(size, mines / (size * size))
  }
}

// Actions
const OPEN_CELL = 'modules/MinesweeperRedux/OPEN_CELL'

export const openCell = (coords: Coordinates): AnyAction => ({
  type: OPEN_CELL,
  payload: { coords }
})

// Reducer
const reducer: Reducer<State> = (
  state = getInitialState(),
  action: AnyAction,
) => {
  const { playerField: pF, gameField } = state
  switch (action.type) {
    case OPEN_CELL:
      const { coords } = action.payload
      try {
        const playerField = MineSweeper.openCell(coords, pF, gameField)
        const solved = MineSweeper.detectSolved(pF, gameField)
        return {
          ...state,
          playing: !solved,
          playerField,
        }
      } catch (e: unknown) {
        return {
          ...state,
          error: (e as Error).message,
          playing: false,
          won: false,
          playerField: gameField,
        }
      }
    default: return state
  }
}

export default reducer
