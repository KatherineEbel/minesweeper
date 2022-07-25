import React from 'react'
import 'twin.macro'

export interface CounterProps {
  value: string
}

const Counter = ({ value }: CounterProps) => {
  return (
    <div tw="inline-block text-rose-600 bg-slate-700 p-2 tracking-tighter drop-shadow-counter">
      {value}
    </div>
  )
}

export default Counter
