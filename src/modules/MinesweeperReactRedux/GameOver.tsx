import GameOver from 'components/Game/GameOver'
import {useCallback} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {RootState} from 'store'
import { actions } from 'modules/MinesweeperRedux'
const { reset } = actions

const GameOverRedux = () => {
  const dispatch = useDispatch()
  const onClick = useCallback(() => dispatch(reset()), [])

  const {won} = useSelector(({minesweeper}: RootState) => minesweeper)
  return (
    <GameOver onClick={onClick} won={won}/>
  )
}

export default GameOverRedux