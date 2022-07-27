import {useState} from 'react'
import {GameSettings, Level} from '../types/game'
import {Coordinates, Field} from '../helpers/field'
import {MineSweeper} from '../types/minesweeper'
import {CellState} from '../types/cell'

const buildGameField = (level: Level, size: number, mines: number) => {
  return MineSweeper.buildField(GameSettings[level][0], mines / (size * size))
}

export const useGame = () => {
  const [won, setWon] = useState<boolean | null>(null)
  const [level, setLevel] = useState<Level>('beginner')
  const [size, mines] = GameSettings[level]
  const [playerField, setPlayerField] = useState<Field>(MineSweeper.buildEmpty(size, CellState.hidden))
  const [gameField, setGameField] = useState<Field>(buildGameField(level, size, mines))

  const onClick = (coords: Coordinates) => {
    try {
      const updatedPlayerField = MineSweeper.openCell(coords, playerField, gameField)
      setPlayerField([...updatedPlayerField])
    } catch (e) {
      setPlayerField([...gameField])
      setWon(false)
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

  const resetFields = (newLevel: Level = level, newSize: number = size, mineCount: number = mines) => {
    setWon(null)
    setPlayerField([...MineSweeper.buildEmpty(newSize, CellState.hidden)])
    setGameField([...buildGameField(newLevel, newSize, mineCount)])
  }

  const reset = () => {
    resetFields()
    setWon(null)
  }

  return {
    level,
    won,
    playerField,
    onClick,
    onChangeLevel,
    reset,
  }
}