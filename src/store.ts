import { configureStore } from '@reduxjs/toolkit'
import {reducer as minesweeper} from 'modules/MinesweeperRedux'

export const store = configureStore({
  reducer: {
    minesweeper
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch