import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import MinesweeperRedux from 'modules/MinesweeperRedux/MinesweeperRedux'

jest.mock('lib/minesweeper')

describe('MinesweeperRedux', () => {
  test('it renders game field', () => {
    const { asFragment } = render(<MinesweeperRedux/>)
    expect(asFragment()).toMatchSnapshot()
  })

  test('clicking cell', () => {
    const { asFragment } = render(<MinesweeperRedux/>)
    userEvent.click(screen.getByTestId('0-0'))
    expect(asFragment()).toMatchSnapshot()
  })

  test('flagging cell', () => {
    const { asFragment} = render(<MinesweeperRedux/>)
    userEvent.click(screen.getByTestId('0-0'), { button: 2})
    expect(asFragment()).toMatchSnapshot()
  })

  test('resetting game', () => {
    const { asFragment} = render(<MinesweeperRedux/>)
    userEvent.click(screen.getByTestId('0-0'))
    expect(asFragment()).toMatchSnapshot()
    userEvent.click(screen.getByRole('button', { name: '🙂'}))
    expect(asFragment()).toMatchSnapshot()
  })

  test('changing level', () => {
    const { asFragment } = render(<MinesweeperRedux/>)
    userEvent.selectOptions(screen.getByRole('combobox'), 'intermediate')
    expect(asFragment()).toMatchSnapshot()
  })
})