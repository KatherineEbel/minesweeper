import Cell from '../../components/Grid/Cell'
import {Cell as CellType} from '../../lib/cell'
import {createEvent, fireEvent, render } from '@testing-library/react'
import {isActive, Coordinates} from '../../lib/helpers/field'

describe('Cell Component', function () {
  const coords: Coordinates = [1, 1]
  const cells = Array.from({length: 13}, (_, k) => ({cell: k as CellType, prevented: true}))
  test.each(cells)('check prevent default for context menu', ({cell, prevented}) => {
    const props = { coords, onClick: jest.fn(), onContextMenu: jest.fn() }
    const {container} = render(<Cell type={cell } {...props}/>)
    const target = container.querySelector(`.cell-${coords.join('-')}`)!
    const contextMenuEvent = createEvent.contextMenu(target)
    fireEvent(target, contextMenuEvent)
    expect(contextMenuEvent.defaultPrevented).toBe(prevented)
  })


  test.each(cells.filter(({cell}) => isActive(cell)))('onClick and onContextMenu handlers called for active cells', ({cell }) => {
    const props = { coords, onClick: jest.fn(), onContextMenu: jest.fn() }
    const {container } = render(<Cell type={cell } {...props}/>)
    const target = container.querySelector(`.cell-${coords.join('-')}`)!
    if (isActive(cell)) {
      expect(target).toHaveStyle(`border: 1px solid rgba(0,0,0,0.8)`)
      fireEvent.mouseDown(target)
      expect(target).toHaveStyle(`border: 1px solid transparent`)
    }
    fireEvent.click(target)
    fireEvent.contextMenu(target)
    expect(props.onClick).toBeCalled()
    expect(props.onContextMenu).toBeCalled()
  })

})