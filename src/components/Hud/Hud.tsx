import React from 'react'
import tw from 'twin.macro'
import Counter from './Counter'
import LevelComponent from './Level'
import Reset from './Reset'
import {Level} from 'lib/game'
import Timer from './Timer'

export interface HudProps {
  currentLevel: Level
  levels: readonly Level[]
  seconds: number
  mines: string
  onReset: () => void
  onChangeLevel: React.ChangeEventHandler<HTMLSelectElement>
  defaultLevel: Level
}

export const HudContainer = tw.header`flex pb-4 items-center justify-between`

const Hud = ({ currentLevel, levels, mines, onChangeLevel, onReset, seconds}: HudProps) => {
  return (
    <HudContainer>
      <Timer seconds={seconds}/>
      <LevelComponent currentLevel={currentLevel} levels={levels} onLevelChange={onChangeLevel}/>
      <Reset onReset={onReset}/>
      <Counter value={mines}/>
    </HudContainer>
  )
}

export default Hud
