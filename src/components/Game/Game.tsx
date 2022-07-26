import {Field} from '../../types'
import Header from '../../components/Header/Header'
import Hud from '../../components/Hud/Hud'
import Grid from '../../components/Grid/Grid'
import React from 'react'
import {GameWrapper} from '../../styles'
import GameOver from './GameOver'

const Game = ({field}: {field: Field}) => {
  return <GameWrapper>
    <Header
      text="minesweeper"
      feature="flag"
      firstAction="alt"
      secondAction="click"
    />
    <Hud time={'000'} levels={['beginner', 'intermediate', 'expert']} mines={'010'} onReset={() => console.log('reset!')}/>
    <GameOver onClick={() => null} won={true}/>
    <Grid field={field} onClick={(coords) => console.log(coords)} onContextMenu={coords => console.log(coords)}/>
  </GameWrapper>
}

export default Game