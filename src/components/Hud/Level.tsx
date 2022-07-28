import React, {useState} from 'react'
import tw from 'twin.macro'
import {Level as LevelName} from '../../lib/game'

export interface LevelProps {
  levels: readonly LevelName[]
  onLevelChange: React.ChangeEventHandler<HTMLSelectElement>
}

const Select = tw.select`flex-1 text-center m-0 p-2 text-slate-100 border border-slate-800 bg-slate-600`
const Option = tw.option`font-normal block whitespace-nowrap h-6 p-2`

const Level = ({ levels, onLevelChange }: LevelProps) => {
  const [value, setValue] = useState<LevelName>('beginner')
  const handleChangeLevel: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
    onLevelChange(e)
    setValue(e.target.value as LevelName)
  }
  return (
    <Select onChange={handleChangeLevel} value={value}>
      {levels.map((o) =>
        (
          <Option key={Math.random().toString(16).slice(2)} className='' value={o}>
            {o}
          </Option>
        ))}
    </Select>
  )
}

export default Level
