import React from 'react'
import 'twin.macro'
import tw from 'twin.macro'

export interface CounterProps {
  value: string
}

const CounterLabel = tw.p`inline-block border-2 border-rose-500 text-rose-600 bg-slate-700 p-1 tracking-tighter drop-shadow-counter`

const Counter = ({ value }: CounterProps) => {
  return (
    <CounterLabel>
      {value}
    </CounterLabel>
  )
}

export default Counter
