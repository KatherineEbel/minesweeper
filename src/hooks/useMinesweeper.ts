import {useState} from 'react'
import {GameSettings, Level} from '../lib/game'
import {Coordinates, Field} from '../lib/helpers/field'
import {MineSweeper} from '../lib/minesweeper'
import {CellState} from '../lib/cell'

const buildGameField = (level: Level, size: number, mines: number) => {
  return MineSweeper.buildField(GameSettings[level][0], mines / (size * size))
}

export const useMinesweeper = () => {
  const [won, setWon] = useState<boolean | null>(null)
  const [level, setLevel] = useState<Level>('beginner')
  const [size, mines] = GameSettings[level]
  const [playerField, setPlayerField] = useState<Field>(MineSweeper.buildEmpty(size, CellState.hidden))
  const [gameField, setGameField] = useState<Field>(buildGameField(level, size, mines))
  const [playing, setPlaying] = useState(false)
  const [shouldClear, setShouldClear] = useState(false)
  const [flagCount, setFlagCount] = useState(0)

  const checkWon = (field: Field) => {
    const [solved] = MineSweeper.detectSolved(field, gameField)
    if (solved) setWon(true)
  }


  const onClick = (coords: Coordinates) => {
    !playing && setPlaying(true)
    if (won !== null) return
    try {
      const updatedPlayerField = MineSweeper.openCell(coords, playerField, gameField)
      checkWon(updatedPlayerField)
      setPlayerField([...updatedPlayerField])
    } catch (e) {
      setPlayerField([...gameField])
      setWon(false)
      setPlaying(false)
    }
  }

  const onChangeLevel = (newLevel: Level) => {
    setWon(null)
    setLevel(() => {
      const [size, mines] = GameSettings[newLevel]
      resetFields(newLevel, size, mines)
      return newLevel
    })
  }

  const onContextMenu = (coords: Coordinates) => {
    !playing && setPlaying(true)
    try {
      const [updatedPlayerField, fieldDiff] = MineSweeper.setFlag(coords, playerField, flagCount, mines)
      setFlagCount(prev => prev + fieldDiff)
      checkWon(updatedPlayerField)
      setPlayerField([...updatedPlayerField])
    } catch (e) {
      window.alert(e)
    }
  }

  const resetFields = (newLevel: Level = level, newSize: number = size, mineCount: number = mines) => {
    setWon(null)
    setFlagCount(0)
    setPlayerField([...MineSweeper.buildEmpty(newSize, CellState.hidden)])
    setGameField([...buildGameField(newLevel, newSize, mineCount)])
  }

  const reset = () => {
    resetFields()
    setPlaying(false)
    setShouldClear(true)
  }


  return {
    mines,
    flagCount,
    level,
    won,
    playerField,
    onClick,
    onChangeLevel,
    onContextMenu,
    reset,
    playing,
    shouldClear,
  }
}