import {AnyAction, PayloadAction, Reducer} from '@reduxjs/toolkit'
import {CellState} from 'lib/cell'
import {Coordinates, Field} from 'lib/helpers/field'
import {GameSettings, Level, Settings} from 'lib/game'
import {MineSweeper} from 'lib/minesweeper'
import { createSlice } from '@reduxjs/toolkit'

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


export const {reducer, actions } = createSlice({
  name: 'minesweeper',
  initialState: getInitialState(),
  reducers: {
    openCell(state, {payload}: PayloadAction<Coordinates>) {
      const {playerField: pF, gameField} = state
      try {
        const playerField = MineSweeper.openCell(payload, pF, gameField)
        const solved = MineSweeper.detectSolved(pF, gameField)
        state.playing = !solved
        state.won = solved || state.won;
        state.playerField = solved ? gameField : playerField
      } catch (e: unknown) {
        state.error = (e as Error).message
        state.playing = false
        state.won = false
        state.playerField = gameField
      }
    },
    setFlag(state, {payload}: PayloadAction<Coordinates>) {
      const {gameField, playerField, flagCounter, mines} = state
      try {
        const [updatedField, flagDif] = MineSweeper.setFlag(payload, playerField, flagCounter, mines)
        state.flagCounter += flagDif
        const solved = MineSweeper.detectSolved(updatedField, gameField)
        state.won = solved || state.won
        state.playing = !solved
        state.playerField = solved ? gameField : updatedField
      } catch (e: unknown) {
        state.error = (e as Error).message
      }
    },
  },
})