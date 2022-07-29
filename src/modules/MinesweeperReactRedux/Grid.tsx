import {useAppDispatch, useAppSelector} from 'hooks'
import {Coordinates} from 'lib/helpers/field'
import {runTimer} from 'modules/MinesweeperRedux/minesweeper'
import React, {useCallback} from 'react'
import Grid from 'components/Grid/Grid'
import {useDispatch, useSelector} from 'react-redux'
import {RootState} from 'store'
import { actions } from 'modules/MinesweeperRedux'
const { openCell, setFlag } = actions

const GridRedux = () => {
  const dispatch = useAppDispatch()
  const playerField = useAppSelector(({minesweeper}) => minesweeper.playerField)
  const onSelectCell = useCallback((coords: Coordinates) => {
    dispatch(openCell(coords))
    dispatch(runTimer())
  }, [])
  const onSetFlag = useCallback((coords: Coordinates) => {
    dispatch(setFlag(coords))
    dispatch(runTimer())
  }, [])

  return (
    <Grid field={playerField} onClick={onSelectCell} onContextMenu={onSetFlag}/>
  )
}

export default GridRedux