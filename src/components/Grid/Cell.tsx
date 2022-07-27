import tw, {styled} from 'twin.macro'
import {Cell as CellType, CellState } from '../../types/cell'
import React from 'react'
import {isActive, Coordinates} from '../../helpers/field'
import {useMouseDown} from '../../hooks/useMouseDown'

const transparent = 'rgba(0,0,0.0)'
const colors: { [key in CellType ]: string} = {
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
  type: CellType
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


const OpenCell = styled(CellContainer)<Pick<CellProps, 'type'>>`
  ${tw`cursor-default border-slate-500`}
  color: ${({ type }) => colors[type as CellType] ?? transparent};
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

const Bomb = tw.div`
  rounded-full w-4 h-4 bg-slate-900
`

const BombFrame = tw(OpenCell)`bg-rose-600`

const Cell = ({type, coords, ...rest}: CellProps) => {
  const [mouseDown, onMouseUp, onMouseDown] = useMouseDown()
  const isActiveCell = isActive(type)

  const onClick = () => rest.onClick && rest.onClick(coords)

  const onContextMenu = (el: React.MouseEvent<HTMLElement>) => {
    el.preventDefault()
    if (isActiveCell) rest.onContextMenu(coords)
  }

  const commonProps = {
    className: `cell-${coords.join('-')}`,
    onContextMenu,
    type,
    role: 'cell'
  }

  const activeProps = {
    ...commonProps,
    mouseDown,
    onClick,
    onMouseUp,
    onMouseDown,
  }


  switch (type) {
    case CellState.empty:
      return <EmptyCell {...commonProps}>{type}</EmptyCell>
    case CellState.bomb:
      return <BombFrame {...commonProps}>
        <Bomb/>
      </BombFrame>
    case CellState.hidden:
      return <HiddenCell {...activeProps}>{type}</HiddenCell>
    case CellState.flag:
      return <HiddenCell {...activeProps}>
        <Flag>
          {type}
        </Flag>
      </HiddenCell>
    case CellState.weakFlag:
      return <HiddenCell {...activeProps}>
        <WeakFlag>
          {type}
        </WeakFlag>
      </HiddenCell>
    default:
      return <OpenCell {...commonProps}>{type}</OpenCell>
  }
}

export default Cell