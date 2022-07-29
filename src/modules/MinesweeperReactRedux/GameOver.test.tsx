import {render, screen} from '@testing-library/react'
import GameOverRedux from 'modules/MinesweeperReactRedux/GameOver'
import React from 'react'
import {Provider} from 'react-redux'
import {store} from 'store'

test('GameOver renders correctly', () => {
  const { asFragment } = render(
    <Provider store={store}>
      <GameOverRedux/>
    </Provider>
  )
  const gameOver = screen.getByText("🤕")
  expect(gameOver.parentElement).toHaveStyle({transform: 'translate(-50%, -50%) scale(0)'})
  expect(asFragment()).toMatchSnapshot()
})