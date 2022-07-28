import {act, render, screen} from '@testing-library/react'
import Game from './Game'
import userEvent from '@testing-library/user-event'
import {CellState} from '../../lib/cell'

jest.mock('../../lib/minesweeper')

describe('Game', () => {
  describe('render', () => {
    test('mine field should render with correct size', function () {
      render(<Game/>)
      const cells = screen.getAllByRole('cell')
      // beginner field is 9*9
      expect(cells).toHaveLength(81)
    })
  })

  describe('change level', () => {
    test('select intermediate', () => {
      render(<Game/>)
      userEvent.selectOptions(screen.getByRole('combobox'), 'intermediate')
      const cells = screen.getAllByRole('cell')
      expect(cells).toHaveLength(16 * 16)
    })

    test('select expert', () => {
      render(<Game/>)
      let cells = screen.getAllByRole('cell')
      expect(cells).toHaveLength(9 * 9)
      userEvent.selectOptions(screen.getByRole('combobox'), 'expert')
      cells = screen.getAllByRole('cell')
      expect(cells).toHaveLength(22 * 22)
    })
  })

  describe('Opening cells', () => {
    test('open empty cell on beginner level', () => {
      const {container} = render(<Game/>)
      userEvent.click(container.querySelector('.cell-0-0')!)
      let emptyCells = screen.queryAllByRole('cell', {name: String(CellState.empty)})
      expect(emptyCells).toHaveLength(9)
    })

    test('open non-empty cell', () => {
      const {container} = render(<Game/>)
      userEvent.click(container.querySelector('.cell-1-8')!)
      expect(screen.getAllByRole('cell', {name: '1'})).toHaveLength(1)
    })

    test('open empty cell intermediate level', () => {
      const {container} = render(<Game/>)
      userEvent.selectOptions(screen.getByRole('combobox'), 'intermediate')
      const cellToClick = container.querySelector('.cell-0-5')!
      userEvent.click(cellToClick)
      expect(screen.getAllByRole('cell', {name: '0'})).toHaveLength(17)
    })

    test('open empty cell expert level', () => {
      const {container} = render(<Game/>)
      userEvent.selectOptions(screen.getByRole('combobox'), 'expert')
      userEvent.click(container.querySelector('.cell-5-14')!)
      expect(screen.getAllByRole('cell', {name: '0'})).toHaveLength(11)
    })

    test('neighbor cells of empty cell opened', () => {
      const {container} = render(<Game/>)
      userEvent.click(container.querySelector('.cell-8-1')!)
      expect(screen.getAllByRole('cell', {name: '1'})).toHaveLength(4)
      expect(screen.getAllByRole('cell', {name: '2'})).toHaveLength(2)
    })
  })

  describe('Reset Game', () => {
    test('playerField gets reset', () => {
      const {container} = render(<Game/>)
      expect(screen.queryAllByRole('cell', {name: String(CellState.hidden)})).toHaveLength(81)
      userEvent.click(container.querySelector('.cell-0-0')!)
      expect(screen.queryAllByRole('cell', {name: String(CellState.empty)})).toHaveLength(9)
      userEvent.click(screen.getByRole('button'))
      expect(screen.queryAllByRole('cell', {name: String(CellState.hidden)})).toHaveLength(81)
    })
  })

  describe('GameOver', function () {
    describe('losing', () => {
      test('clicking game over popup resets game', async () => {
        const {container} = render(<Game/>)
        userEvent.click(container.querySelector('.cell-0-4')!)
        const gameOverPopup = screen.getByText('🤕')
        expect(gameOverPopup).toBeInTheDocument()
        expect(screen.queryAllByRole('cell', {name: String(CellState.hidden)})).toHaveLength(0)
        userEvent.click(gameOverPopup)
        expect(gameOverPopup.parentElement).toHaveStyle('transform: translate(-50%, -50%) scale(0)')
        const hiddenCells = screen.getAllByRole('cell', {name: String(CellState.hidden)})
        expect(hiddenCells).toHaveLength(81)

      })
    })

    describe('winning', () => {
      test('beginner', () => {
        const {container} = render(<Game/>)

        // clear empty
        userEvent.click(container.querySelector(`.cell-${0}-${0}`)!)
        userEvent.click(container.querySelector(`.cell-${0}-${8}`)!)
        userEvent.click(container.querySelector(`.cell-${8}-${8}`)!)
        // flag mines
        const mineCoords = [[0, 4], [2, 4], [2, 8], [4, 1], [5, 3], [5, 6], [6, 2], [6, 5], [7, 5], [8, 3]]
        mineCoords.forEach(coord => {
          const [row, col] = coord
          userEvent.click(container.querySelector(`.cell-${row}-${col}`)!, {button: 2})
        })
        // select hidden
        let hidden = screen.queryAllByRole('cell', {name: String(CellState.hidden)})
        hidden.forEach(el => userEvent.click(el))
        expect(screen.queryAllByRole('cell', {name: String(CellState.hidden)})).toHaveLength(0)
        screen.getByText('😎')
      })
      /*
      *
          [0, 0, 0, 1, 9, 1, 0, 0, 0],
          [0, 0, 0, 2, 2, 2, 0, 1, 1],
          [0, 0, 0, 1, 9, 1, 0, 1, 9],
          [1, 1, 1, 1, 1, 1, 0, 1, 1],
          [1, 9, 2, 1, 1, 1, 1, 1, 0],
          [1, 2, 3, 9, 2, 2, 9, 1, 0],
          [0, 1, 9, 2, 3, 9, 3, 1, 0],
          [0, 1, 2, 2, 3, 9, 2, 0, 0],
          [0, 0, 1, 9, 2, 1, 1, 0, 0],
      * */
    })
  })

  describe('onContextMenu', () => {
    test('flagging hidden cell', () => {
      const {container} = render(<Game/>)
      userEvent.click(container.querySelector('.cell-0-4')!, {button: 2})
      expect(screen.getAllByRole('cell', {name: String(CellState.flag)})).toHaveLength(1)
    })
  })

  describe('timer', () => {
    test('it should start when cell clicked', () => {
      jest.useFakeTimers()
      render(<Game/>)
      const timer = screen.getByRole('timer')
      act(() => {
        jest.advanceTimersByTime(5000)
      })
      expect(timer).toHaveTextContent('000')
      const firstCell = screen.getAllByRole('cell')[0]
      userEvent.click(firstCell)
      act(() => {
        jest.advanceTimersByTime(5000)
      })
      expect(timer).toHaveTextContent('005')
    })
    
    test('it stops when game lost', () => {
      jest.useFakeTimers()
      const { container} = render(<Game/>)
      const timer = screen.getByRole('timer')
      const firstCell = screen.getAllByRole('cell')[0]
      userEvent.click(firstCell)
      act(() => {
        jest.advanceTimersByTime(5000)
      })
      userEvent.click(container.querySelector('.cell-0-4')!)
      act(() => {
        jest.advanceTimersByTime(5000)
      })
      expect(timer).toHaveTextContent('005')
    })
  })
})