import {Coordinates} from 'lib/helpers/field'
import React, {useCallback, useReducer} from 'react'
import GameOver from 'components/Game/GameOver'
import Grid from 'components/Grid/Grid'
import Header from 'components/Header'
import Hud from 'components/Hud'
import {GameLevels, Level} from 'lib/game'
import {GameWrapper} from 'styles'
import { reducer, actions, getInitialState } from 'modules/MinesweeperRedux/minesweeper'
const { setFlag, reset, openCell, changeLevel } = actions

const MinesweeperRedux = () => {
  const [ {seconds, flagCounter, level, playerField, playing, mines, won}, dispatch ] = useReducer(reducer, getInitialState())
  const handleChangeLevel = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(changeLevel(e.target.value as Level))
  }, [])

  const onSelectCell = useCallback((coords: Coordinates) => dispatch(openCell(coords)), [])
  const onSetFlag = useCallback((coords: Coordinates) => dispatch(setFlag(coords)), [])
  const onReset = useCallback(() => dispatch(reset()), [])

  return <GameWrapper>
    <Header
      text='minesweeper'
      feature='flag'
      firstAction='right'
      secondAction='click'
    />
    <Hud seconds={seconds} levels={GameLevels} mines={String(mines - flagCounter)}
         onReset={onReset} currentLevel={level}
         defaultLevel={level} onChangeLevel={handleChangeLevel}
    />
    <div className='relative'>
      <GameOver onClick={onReset} won={won}/>
      <Grid field={playerField} onClick={onSelectCell} onContextMenu={onSetFlag}/>
    </div>
  </GameWrapper>
}

export default MinesweeperRedux
