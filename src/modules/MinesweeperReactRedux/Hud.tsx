import Hud from 'components/Hud'
import {GameLevels, Level} from 'lib/game'
import React, {ChangeEvent, useCallback} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {RootState} from 'store'
import { actions } from 'modules/MinesweeperRedux'

const { reset, changeLevel } = actions

const HudRedux = () => {
  const dispatch = useDispatch()
  const {playing, mines, flagCounter, level} = useSelector(({minesweeper }: RootState) => minesweeper)
  const onReset = useCallback(() => dispatch(reset()), [])
  const onChangeLevel = useCallback((e: ChangeEvent<HTMLSelectElement>) => dispatch(changeLevel(e.target.value as Level)), [])
  return (
    <Hud running={playing} shouldClear={!playing} levels={GameLevels} mines={String(mines - flagCounter)}
         onReset={onReset} currentLevel={level}
         defaultLevel={level} onChangeLevel={onChangeLevel}
    />
  )
}

export default HudRedux