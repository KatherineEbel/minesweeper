import {CounterLabel} from '../../styles'
import {useEffect, useState} from 'react'

export interface TimerProps {
  running: boolean
  shouldClear: boolean
}

const Timer = ({ running, shouldClear}: TimerProps) => {
  const [seconds, setSeconds] = useState(0)
  const [interval, setMyTimeout] = useState<NodeJS.Timeout | undefined>(undefined)

  useEffect(() => {
    if (!running) {
      return clearInterval(interval)
    }
    setMyTimeout(setInterval(() => {setSeconds(prev => prev + 1)}, 1000))
    return () => clearInterval(interval)
  }, [running])

  useEffect(() => {
    shouldClear && setSeconds(0)
  }, [shouldClear])

  return <CounterLabel role='timer'>{String(seconds).padStart(3, '0')}</CounterLabel>
}

export default Timer