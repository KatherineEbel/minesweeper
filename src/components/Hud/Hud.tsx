import React from 'react'
import tw from 'twin.macro'
import Counter from './Counter'
import LevelComponent from './Level'
import Reset from './Reset'
import {Level} from '../../lib/game'
import Timer from './Timer'

export interface HudProps {
  currentLevel: Level
  running: boolean
  shouldClear: boolean
  levels: readonly Level[]
  mines: string
  onReset: () => void
  onChangeLevel: React.ChangeEventHandler<HTMLSelectElement>
  defaultLevel: Level
}

const HudContainer = tw.header`flex pb-4 items-center justify-between`

const Hud = ({ currentLevel, running, shouldClear, levels, mines, onChangeLevel, onReset}: HudProps) => {
  return (
    <HudContainer>
      <Timer running={running} shouldClear={shouldClear} />
      <LevelComponent currentLevel={currentLevel} levels={levels} onLevelChange={onChangeLevel}/>
      <Reset onReset={onReset}/>
      <Counter value={mines}/>
    </HudContainer>
  )
}

export default Hud
