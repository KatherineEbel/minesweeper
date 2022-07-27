import {render, screen} from '@testing-library/react'
import Game from './Game'
import userEvent from '@testing-library/user-event'
import { CellState} from '../../types/cell'

jest.mock('../../types/minesweeper')

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
      expect(cells).toHaveLength(16*16)
    })

    test('select expert', () => {
      render(<Game/>)
      let cells = screen.getAllByRole('cell')
      expect(cells).toHaveLength(9*9)
      userEvent.selectOptions(screen.getByRole('combobox'), 'expert')
      cells = screen.getAllByRole('cell')
      expect(cells).toHaveLength(22*22)
    })
  })

  describe('Opening cells', () => {
    test('open empty cell on beginner level', () => {
      const {container} = render(<Game/>)
      userEvent.click(container.querySelector('.cell-0-0')!)
      let emptyCells = screen.queryAllByRole('cell', { name: String(CellState.empty)})
      expect(emptyCells).toHaveLength(9)
    })

    test("open non-empty cell", () => {
      const {container} = render(<Game/>)
      userEvent.click(container.querySelector('.cell-1-8')!)
      expect(screen.getAllByRole('cell', { name: '1'})).toHaveLength(1)
    })

    test('open empty cell intermediate level', () => {
      const {container} = render(<Game/>)
      userEvent.selectOptions(screen.getByRole('combobox'), 'intermediate')
      const cellToClick = container.querySelector('.cell-0-5')!
      userEvent.click(cellToClick)
      expect(screen.getAllByRole('cell', { name: '0'})).toHaveLength(17)
    })

    test('open empty cell expert level', () => {
      const {container} = render(<Game/>)
      userEvent.selectOptions(screen.getByRole('combobox'), 'expert')
      userEvent.click(container.querySelector('.cell-5-14')!)
      expect(screen.getAllByRole('cell', { name: '0'})).toHaveLength(11)
    })

    test('neighbor cells of empty cell opened', () => {
      const {container} = render(<Game/>)
      userEvent.click(container.querySelector('.cell-8-1')!)
      expect(screen.getAllByRole('cell', { name: '1'})).toHaveLength(4)
      expect(screen.getAllByRole('cell', { name: '2'})).toHaveLength(2)
    })
  })

  describe('Reset Game', () => {
    test('playerField gets reset', () => {
      const {container} = render(<Game/>)
      expect(screen.queryAllByRole('cell', { name: String(CellState.hidden)})).toHaveLength(81)
      userEvent.click(container.querySelector('.cell-0-0')!)
      expect(screen.queryAllByRole('cell', { name: String(CellState.empty)})).toHaveLength(9)
      userEvent.click(screen.getByRole('button'))
      expect(screen.queryAllByRole('cell', { name: String(CellState.hidden)})).toHaveLength(81)
    })
  })
})