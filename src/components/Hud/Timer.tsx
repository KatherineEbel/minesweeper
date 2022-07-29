import {CounterLabel} from 'styles'

export interface TimerProps {
  seconds: number
}

const Timer = ({seconds}: TimerProps) => {
  return <CounterLabel role='timer'>{String(seconds).padStart(3, '0')}</CounterLabel>
}

export default Timer