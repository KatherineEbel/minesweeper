import React from 'react'
import {CounterLabel} from '../../styles'

export interface CounterProps {
  value: string
}

const Counter = ({ value }: CounterProps) => {
  return (
    <CounterLabel role='counter'>
      {value.padStart(3, '0')}
    </CounterLabel>
  )
}

export default Counter
