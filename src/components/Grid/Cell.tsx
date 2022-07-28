import tw, {styled} from 'twin.macro'
import {Cell as CellType, CellState} from 'lib/cell'
import React, {memo} from 'react'
import {Coordinates, isActive} from 'lib/helpers/field'
import {useMouseDown} from 'hooks/useMouseDown'

const transparent = 'rgba(0,0,0.0)'
const colors: { [key in CellType]: string } = {
  0: '#0f172a',
  1: '#bae6fd',
  2: '#99f6e4',
  3: '#a78bfa',
  4: '#f0abfc',
  5: '#bef264',
  6: '#fb923c',
  7: '#fbbf24',
  8: '#fda4af',
  9: 'transparent',
  10: 'transparent',
  11: 'transparent',
  12: 'transparent',
}

export interface CellProps {
  cellType: CellType
  coords: Coordinates
  mouseDown?: boolean,
  onClick?: (coords: Coordinates) => void
  onContextMenu: (coords: Coordinates) => void
  onMouseUp?: () => void
  onMouseDown?: () => void
}

const CellContainer = tw.div`
flex items-center justify-center cursor-pointer w-8 h-8 bg-slate-700 border border-slate-600
`

type HiddenCellProps = Pick<CellProps, 'mouseDown'>

const HiddenCell = styled(CellContainer)<HiddenCellProps>`
  ${tw`select-none hover:bg-slate-600 transition-all duration-300 text-transparent`}
  box-shadow: -3px 3px rgba(0, 0, 0, 0.7), -2px 2px rgba(0, 0, 0, 0.7), -1px 1px rgba(0, 0, 0, 0.7);
  border: 1px solid ${({mouseDown = false}) => mouseDown ? 'transparent' : 'rgba(0,0,0,0.8)'};

  &:active {
    box-shadow: -1px 1px rgba(0, 0, 0, 0.7), -2px 2px rgba(0, 0, 0, 0.7), -1px 1px rgba(0, 0, 0, 0.7);
  }
`


const OpenCell = styled(CellContainer)<Pick<CellProps, 'cellType'>>`
  ${tw`cursor-default border-slate-500`}
  color: ${({cellType}) => colors[cellType as CellType] ?? transparent};
`

const EmptyCell = styled(OpenCell)`${tw`text-transparent`}`

const StyledFlag = styled.div`
  width: 0;
  height: 0;
  border-top: .5rem solid transparent;
  border-bottom: .5rem solid transparent;
`

const Flag = styled(StyledFlag)`
  border-left: .5rem solid #ec433c;
`

const WeakFlag = styled(StyledFlag)`
  border-left: .5rem solid #fcd34d
`

const Mine = tw.div`
  rounded-full w-4 h-4 bg-slate-900
`

const MineFrame = tw(OpenCell)`bg-rose-600`

export const areEqual = (
  prevProps: CellProps,
  nextProps: CellProps
): boolean => !prevProps.coords.some((coord, idx) => nextProps.coords[idx] !== coord)
  && prevProps.cellType === nextProps.cellType
  && prevProps.onClick === nextProps.onClick
  && prevProps.onContextMenu === nextProps.onContextMenu

const Cell = memo(({cellType, coords, ...rest}: CellProps) => {
  const [mouseDown, onMouseUp, onMouseDown] = useMouseDown()
  const isActiveCell = isActive(cellType)

  const onClick = () => rest.onClick && rest.onClick(coords)

  const onContextMenu = (el: React.MouseEvent<HTMLElement>) => {
    el.preventDefault()
    if (isActiveCell) rest.onContextMenu(coords)
  }

  const commonProps = {
    className: `cell-${coords.join('-')}`,
    onContextMenu,
    cellType: cellType,
    role: 'cell'
  }

  const activeProps = {
    ...commonProps,
    mouseDown,
    onClick,
    onMouseUp,
    onMouseDown,
  }


  switch (cellType) {
    case CellState.empty:
      return <EmptyCell {...commonProps}>{cellType}</EmptyCell>
    case CellState.mine:
      return <MineFrame {...commonProps}>
        <Mine/>
      </MineFrame>
    case CellState.hidden:
      return <HiddenCell {...activeProps}>{cellType}</HiddenCell>
    case CellState.flag:
      return <HiddenCell {...activeProps}>
        <Flag>
          {cellType}
        </Flag>
      </HiddenCell>
    case CellState.weakFlag:
      return <HiddenCell {...activeProps}>
        <WeakFlag>
          {cellType}
        </WeakFlag>
      </HiddenCell>
    default:
      return <OpenCell {...commonProps}>{cellType}</OpenCell>
  }
}, areEqual)

export default Cell