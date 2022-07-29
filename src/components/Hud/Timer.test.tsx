import {render, screen} from '@testing-library/react'
import React from 'react'
import Timer from 'components/Hud/Timer'

describe('Timer', () => {
  it('should render 3 correctly', function () {
    render(<Timer seconds={3}/>)
    expect(screen.getByRole('timer')).toHaveTextContent('003')
  })

  it('should render 50 correctly', function () {
    render(<Timer seconds={50}/>)
    expect(screen.getByRole('timer')).toHaveTextContent('050')
  })
})