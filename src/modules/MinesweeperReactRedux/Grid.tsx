import {Coordinates} from 'lib/helpers/field'
import React, {useCallback} from 'react'
import Grid from 'components/Grid/Grid'
import {useDispatch, useSelector} from 'react-redux'
import {RootState} from 'store'
import { actions } from 'modules/MinesweeperRedux'
const { openCell, setFlag } = actions

const GridRedux = () => {
  const dispatch = useDispatch()
  const playerField = useSelector(({minesweeper}: RootState) => minesweeper.playerField)
  const onSelectCell = useCallback((coords: Coordinates) => dispatch(openCell(coords)), [])
  const onSetFlag = useCallback((coords: Coordinates) => dispatch(setFlag(coords)), [])

  return (
    <Grid field={playerField} onClick={onSelectCell} onContextMenu={onSetFlag}/>
  )
}

export default GridRedux