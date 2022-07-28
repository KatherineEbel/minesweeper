import {GameLevels, Level} from '../../lib/game'
import Header from '../../components/Header/Header'
import Hud from '../../components/Hud/Hud'
import Grid from '../../components/Grid/Grid'
import React from 'react'
import {GameWrapper} from '../../styles'
import GameOver from './GameOver'
import {useMinesweeper} from '../../hooks/useMinesweeper'


const Game = () => {
  const {level, won, playing, playerField, onChangeLevel, onContextMenu, reset, shouldClear, onClick, flagCount, mines} = useMinesweeper()

  const handleChangeLevel = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChangeLevel(e.target.value as Level)
  }
  return <GameWrapper>
    <Header
      text='minesweeper'
      feature='flag'
      firstAction='right'
      secondAction='click'
    />
    <Hud running={playing} shouldClear={shouldClear} levels={GameLevels} mines={String(mines - flagCount)}
         onReset={reset}
         defaultLevel={level} onChangeLevel={handleChangeLevel}
    />
    <GameOver onClick={reset} won={won}/>
    <Grid field={playerField} onClick={onClick} onContextMenu={onContextMenu}/>
  </GameWrapper>
}

export default Game