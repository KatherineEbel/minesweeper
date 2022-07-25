import tw, {styled} from 'twin.macro'
import {Cell as CellType, CellState, Coordinates} from '@/types'
import CellStories from '@/components/Grid/Cell.stories'
import React from 'react'

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
  onClick: (coords: Coordinates) => void
  onContextMenu: (coords: Coordinates) => void
}

const CellFrame = tw.div`
flex items-center justify-center cursor-pointer w-8 h-8 bg-slate-700 border border-slate-600
`
const ClosedFrame = styled(CellFrame)`
  ${tw`select-none hover:bg-slate-600 transition-all duration-300`}
  box-shadow: -3px 3px rgba(0,0,0,0.7), -2px 2px rgba(0,0,0,0.7), -1px 1px rgba(0,0,0,0.7);
  border: 1px solid rgba(0,0,0,0.8);
  &:active {
    box-shadow: -1px 1px rgba(0,0,0,0.7), -2px 2px rgba(0,0,0,0.7), -1px 1px rgba(0,0,0,0.7);
  }
`


const RevealedFrame = styled(CellFrame)<Pick<CellProps, 'type'>>`
  ${tw`cursor-default border-slate-500`}
  color: ${({ type }) => colors[type as CellType] ?? transparent};
`

const Flag = styled.div`
  width: 0;
  height: 0;
  border-top: .5rem solid transparent;
  border-bottom: .5rem solid transparent;
`

const StrongFlag = styled(Flag)`
  border-left: .5rem solid #ec433c;
`

const WeakFlag = styled(Flag)`
  border-left: .5rem solid #fcd34d
`

const Bomb = tw.div`
  rounded-full w-4 h-4 bg-slate-900
`

const BombFrame = tw(RevealedFrame)`bg-rose-600`

const Cell = ({type, coords, ...rest}: CellProps) => {
  const isActiveCell = [CellState.hidden, CellState.mark, CellState.weakMark].includes(type)


  const onClick = () => {
    if (isActiveCell) {
      rest.onClick(coords)
    }
  }

  const onContextMenu = (el: React.MouseEvent<HTMLElement>) => {
    el.preventDefault()
    if (isActiveCell) rest.onContextMenu(coords)
  }

  const props = {
    onClick,
    type,
    onContextMenu,
  }

  switch (type) {
    case CellState.bomb:
      return <BombFrame {...props}>
        <Bomb/>
      </BombFrame>
    case CellState.hidden:
      return <ClosedFrame {...props}/>
    case CellState.mark:
      return <ClosedFrame {...props}>
        <StrongFlag/>
      </ClosedFrame>
    case CellState.weakMark:
      return <ClosedFrame {...props}>
        <WeakFlag/>
      </ClosedFrame>
    default:
      return <RevealedFrame {...props}>{type}</RevealedFrame>
  }
}

export default Cell