import Hud from 'components/Hud'
import Counter from 'components/Hud/Counter'
import {HudContainer} from 'components/Hud/Hud'
import LevelComponent from 'components/Hud/Level'
import Reset from 'components/Hud/Reset'
import Timer from 'components/Hud/Timer'
import {GameLevels, Level} from 'lib/game'
import React, {ChangeEvent, useCallback} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {RootState} from 'store'
import { actions } from 'modules/MinesweeperRedux'

const { reset, changeLevel } = actions

const HudRedux = () => {
  const dispatch = useDispatch()
  const {mines, flagCounter, level, seconds} = useSelector(({minesweeper }: RootState) => minesweeper)
  const onReset = useCallback(() => dispatch(reset()), [])
  const onChangeLevel = useCallback((e: ChangeEvent<HTMLSelectElement>) => dispatch(changeLevel(e.target.value as Level)), [])
  return (
    <Hud seconds={seconds} levels={GameLevels} mines={String(mines - flagCounter)}
         onReset={onReset} currentLevel={level}
         defaultLevel={level} onChangeLevel={onChangeLevel}
    />
  )
}

export default HudRedux