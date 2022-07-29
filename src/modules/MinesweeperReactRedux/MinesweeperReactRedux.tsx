import Header from 'components/Header'
import GameOver from 'modules/MinesweeperReactRedux/GameOver'
import Grid from 'modules/MinesweeperReactRedux/Grid'
import Hud from 'modules/MinesweeperReactRedux/Hud'
import React from 'react'
import {GameWrapper} from 'styles'

const MinesweeperReactRedux = () => {
  return (
    <GameWrapper>
      <Header
        text='minesweeper'
        feature='flag'
        firstAction='right'
        secondAction='click'
      />
      <Hud/>
      <div className='relative'>
        <GameOver/>
        <Grid/>
      </div>
    </GameWrapper>
  )
}

export default MinesweeperReactRedux