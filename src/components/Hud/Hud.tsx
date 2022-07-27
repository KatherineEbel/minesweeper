import React from 'react'
import tw from 'twin.macro'
import Counter from './Counter'
import LevelComponent from './Level'
import Reset from './Reset'
import {Level} from '../../types/game'

export interface HudProps {
  time: string
  levels: readonly Level[]
  mines: string
  onReset: () => void
  onChangeLevel: React.ChangeEventHandler<HTMLSelectElement>
  defaultLevel: Level
}

const HudContainer = tw.header`flex w-full pb-4 items-center justify-between`

const Hud = ({ time, levels, mines, onChangeLevel, onReset}: HudProps) => {
  return (
    <HudContainer>
      <Counter value={time}/>
      <LevelComponent levels={levels} onLevelChange={onChangeLevel}/>
      <Reset onReset={onReset}/>
      <Counter value={mines}/>
    </HudContainer>
  )
}

export default Hud
