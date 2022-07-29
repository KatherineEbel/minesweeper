import React, {memo} from 'react'
import tw from 'twin.macro'
import {Level as LevelName} from '../../lib/game'

export interface LevelProps {
  currentLevel: LevelName
  levels: readonly LevelName[]
  onLevelChange: React.ChangeEventHandler<HTMLSelectElement>
}

const Select = tw.select`flex-1 text-center m-0 p-2 text-slate-100 focus-visible:border-rose-600 focus-visible:outline-none border border-slate-800 bg-slate-600`
const Option = tw.option`font-normal block whitespace-nowrap h-6 p-2`

const Level = memo(({levels, onLevelChange, currentLevel}: LevelProps) => {
  const handleChangeLevel: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
    onLevelChange(e)
  }
  return (
    <Select onChange={handleChangeLevel} value={currentLevel}>
      {levels.map((o) =>
        (
          <Option key={Math.random().toString(16).slice(2)} className='' value={o}>
            {o}
          </Option>
        ))}
    </Select>
  )
})

Level.displayName = 'Level'

export default Level
