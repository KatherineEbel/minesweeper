import {useCallback, useState} from 'react'
import {GameSettings, Level} from '../lib/game'
import {Coordinates, Field} from '../lib/helpers/field'
import {MineSweeper} from '../lib/minesweeper'
import {CellState} from '../lib/cell'
import {useSettings} from './useSettings'

const buildGameField = (level: Level, size: number, mines: number) => {
  return MineSweeper.buildField(GameSettings[level][0], mines / (size * size))
}

export const useMinesweeper = () => {
  const [won, setWon] = useState<boolean | null>(null)
  const {level, setLevel, settings} = useSettings()
  const [size, mines] = settings
  const [playerField, setPlayerField] = useState<Field>(MineSweeper.buildEmpty(size, CellState.hidden))
  const [gameField, setGameField] = useState<Field>(buildGameField(level, size, mines))
  const [playing, setPlaying] = useState(false)
  const [shouldClear, setShouldClear] = useState(false)
  const [flagCount, setFlagCount] = useState(0)

  const checkWon = (field: Field) => {
    const solved = MineSweeper.detectSolved(field, gameField)
    if (solved) setWon(true)
  }

  // might need to add playing and won to dependencies? no bugs noticed yet
  const onSelectCell = useCallback((coords: Coordinates) => {
    !playing && setPlaying(true)
    if (won !== null) return
    try {
      const updatedPlayerField = MineSweeper.openCell(coords, playerField, gameField)
      handleAction(updatedPlayerField)
    } catch (e) {
      setPlayerField([...gameField])
      setWon(false)
      setPlaying(false)
    }
  }, [level])
  // }, [playerField])

  const onChangeLevel = useCallback((newLevel: Level) => {
    setWon(null)
    const [size, mines] = setLevel(newLevel)
    resetFields(newLevel, size, mines)
  }, [])

  const handleAction = (newPlayerField: Field) => {
    checkWon(newPlayerField)
    setPlayerField([...newPlayerField])
  }

  const onFlagCell = useCallback((coords: Coordinates) => {
    !playing && setPlaying(true)
    try {
      const [updatedPlayerField, fieldDiff] = MineSweeper.setFlag(coords, playerField, flagCount, mines)
      setFlagCount(prev => prev + fieldDiff)
      handleAction(updatedPlayerField)
    } catch (e) {
      window.alert(e)
    }
  }, [])

  const resetFields = (newLevel: Level = level, newSize: number = size, mineCount: number = mines) => {
    setWon(null)
    setFlagCount(0)
    setPlayerField([...MineSweeper.buildEmpty(newSize, CellState.hidden)])
    setGameField([...buildGameField(newLevel, newSize, mineCount)])
  }

  const reset = useCallback(() => {
    resetFields()
    setPlaying(false)
    setShouldClear(true)
  }, [])


  return {
    mines,
    flagCount,
    level,
    won,
    playerField,
    onSelectCell,
    onChangeLevel,
    onFlagCell,
    reset,
    playing,
    shouldClear,
  }
}