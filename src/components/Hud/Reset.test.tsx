import { render, screen } from '@testing-library/react'
import Reset from './Reset'

describe('Reset Button', function () {
  it('should render elements with default state', function () {
    render(<Reset onReset={() => null} />)
    screen.debug()
  })
})
