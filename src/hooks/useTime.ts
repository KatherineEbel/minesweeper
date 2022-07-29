import {useCallback, useEffect, useState} from 'react'

export const useTime = (playing: boolean, won: boolean | null): [number, () => void] => {
  const [seconds, setSeconds] = useState(0)
  const [interval, setMyTimeout] = useState<NodeJS.Timeout | undefined>(undefined)

  const onReset = useCallback(() => setSeconds(0), [])

  useEffect(() => {
    if (!playing) {
      return clearInterval(interval)
    }
    setMyTimeout(setInterval(() => {setSeconds(prev => prev + 1)}, 1000))
    return () => clearInterval(interval)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playing])

  return [seconds, onReset]
}