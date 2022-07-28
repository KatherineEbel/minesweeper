import {useCallback, useState} from 'react'
import {GameSettings, Level, Settings} from '../lib/game'

interface UseSettings {
  settings: Settings
  level: Level
  setLevel: (level: Level) => Settings
}

export const useSettings = (): UseSettings => {
  const [level, setLevel] = useState<Level>('beginner')
  const settings = GameSettings[level]

  const handleLevelChange = useCallback((level: Level) => {
    setLevel(level)
    return GameSettings[level]
  }, [level])

  return {
    level,
    settings,
    setLevel: handleLevelChange
  }
}