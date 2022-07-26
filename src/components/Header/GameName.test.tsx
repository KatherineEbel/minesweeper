import React from 'react'
import { render } from '@testing-library/react'

import GameName from '@/components/Header/GameName'

test('GameName renders correctly', () => {
  const { asFragment } = render(<GameName text='minesweeper'/>)
  expect(asFragment()).toMatchSnapshot()
})