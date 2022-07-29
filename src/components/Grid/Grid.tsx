import React from 'react'
import {styled} from 'twin.macro'
import Cell from './Cell'
import {Coordinates, Field} from 'lib/helpers/field'

export interface GridProps {
  field: Field
  onClick: (coords: Coordinates) => void
  onContextMenu: (coords: Coordinates) => void
}

const GridContainer = styled.div<{size: number}>`
  display: grid;
  grid-template-columns: ${({size}) => `repeat(${size}, 3rem)`};
`

const Grid = ({field, ...rest}: GridProps) => {
  const size = field.length
  return <GridContainer className='mine-field' size={size}>
    {field.map((row: any[], i: any) => {
      return row.map((col, j) => {
        return <Cell key={`${i}-${j}`} cellType={col} coords={[i, j]} {...rest}/>
      })
    })}
  </GridContainer>
}

export default Grid