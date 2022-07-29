import {render, screen} from '@testing-library/react'
import HudRedux from 'modules/MinesweeperReactRedux/Hud'
import React from 'react'
import {Provider} from 'react-redux'
import {store} from 'store'

test('Hud shows correct time',  () => {
  render(
    <Provider store={store}>
      <HudRedux/>
    </Provider>
  )
  expect(screen.getByRole('timer')).toHaveTextContent('000')
})

test('Hud renders correctly', () => {
  const {asFragment} = render(
    <Provider store={store}>
      <HudRedux/>
    </Provider>
  )
  expect(screen.getByRole('combobox')).toHaveValue('beginner')
  expect(asFragment()).toMatchSnapshot()
})