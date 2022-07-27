import {GameLevels, Level} from '../../types/game'
import Header from '../../components/Header/Header'
import Hud from '../../components/Hud/Hud'
import Grid from '../../components/Grid/Grid'
import React from 'react'
import {GameWrapper} from '../../styles'
import GameOver from './GameOver'
import {useGame} from '../../hooks/useGame'


const Game = () => {
  const { level, won, playerField, onChangeLevel, reset, onClick} = useGame()

  const handleChangeLevel = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChangeLevel(e.target.value as Level)
  }
  return <GameWrapper>
    <Header
      text="minesweeper"
      feature="flag"
      firstAction="alt"
      secondAction="click"
    />
    <Hud time={'000'} levels={GameLevels} mines={'010'} onReset={reset}
         defaultLevel={level} onChangeLevel={handleChangeLevel}
    />
    <GameOver onClick={reset} won={won}/>
    <Grid field={playerField} onClick={onClick} onContextMenu={coords => console.log(coords)}/>
  </GameWrapper>
}

export default Game