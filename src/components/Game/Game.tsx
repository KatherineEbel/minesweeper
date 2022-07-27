import {GameLevels, GameSettings, Level} from '../../types/game'
import {CellState} from '../../types/cell'
import {Coordinates, Field,} from '../../helpers/field'
import Header from '../../components/Header/Header'
import Hud from '../../components/Hud/Hud'
import Grid from '../../components/Grid/Grid'
import React, {useState} from 'react'
import {GameWrapper} from '../../styles'
import GameOver from './GameOver'
import {MineSweeper} from '../../types/minesweeper'


const buildGameField = (level: Level, size: number, mines: number) => {
  return MineSweeper.buildField(GameSettings[level][0], mines / (size * size))
}

const Game = () => {
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

  const onChangeLevel: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
    setWon(null)
    setLevel(() => {
      const newLevel = e.target.value as Level
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

  return <GameWrapper>
    <Header
      text="minesweeper"
      feature="flag"
      firstAction="alt"
      secondAction="click"
    />
    <Hud time={'000'} levels={GameLevels} mines={'010'} onReset={resetFields}
         defaultLevel={level} onChangeLevel={onChangeLevel}
    />
    <GameOver onClick={reset} won={won}/>
    <Grid field={playerField} onClick={onClick} onContextMenu={coords => console.log(coords)}/>
  </GameWrapper>
}

export default Game