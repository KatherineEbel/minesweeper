import {GameLevels, Level} from 'lib/game'
import Header from 'components/Header/Header'
import Hud from 'components/Hud/Hud'
import Grid from 'components/Grid/Grid'
import React, {useCallback} from 'react'
import {GameWrapper} from 'styles'
import GameOver from 'components/Game/GameOver'
import {useMinesweeper} from 'hooks/useMinesweeper'


const Minesweeper = () => {
  const {level, won, seconds, playerField, onChangeLevel, onFlagCell, reset, onSelectCell, flagCount, mines} = useMinesweeper()

  const handleChangeLevel = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    onChangeLevel(e.target.value as Level)
  }, [onChangeLevel])

  return <GameWrapper>
    <Header
      text='minesweeper'
      feature='flag'
      firstAction='right'
      secondAction='click'
    />
    <Hud seconds={seconds} levels={GameLevels} mines={String(mines - flagCount)}
         onReset={reset} currentLevel={level}
         defaultLevel={level} onChangeLevel={handleChangeLevel}
    />
    <div className='relative'>
      <GameOver onClick={reset} won={won}/>
      <Grid field={playerField} onClick={onSelectCell} onContextMenu={onFlagCell}/>
    </div>
  </GameWrapper>
}

export default Minesweeper