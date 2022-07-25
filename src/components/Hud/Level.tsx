import React from 'react'
import tw from 'twin.macro'

export interface LevelProps {
  levels: string[]
}

const Select = tw.select`m-0 p-2 text-slate-100 border border-slate-800 bg-slate-600`
const Option = tw.option`font-normal block whitespace-nowrap h-6 p-2`

const Level = ({ levels }: LevelProps) => {
  return (
    <Select>
      {levels.map((o) => (
        <Option key={new Date().getTime()} className="" value={o}>
          {o}
        </Option>
      ))}
    </Select>
  )
}

export default Level