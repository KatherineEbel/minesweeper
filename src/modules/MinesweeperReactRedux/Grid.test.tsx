import {render} from '@testing-library/react'
import GridRedux from 'modules/MinesweeperReactRedux/Grid'
import React from 'react'
import {Provider} from 'react-redux'
import {store} from 'store'

test('Grid renders correctly', () => {
  const { asFragment } = render(
    <Provider store={store}>
      <GridRedux/>
    </Provider>
  )
  expect(asFragment()).toMatchSnapshot()
})