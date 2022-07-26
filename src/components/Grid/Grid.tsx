import React from 'react'
import {styled} from 'twin.macro'
import {Coordinates, Field} from '../../types'
import Cell from './Cell'

export interface GridProps {
  field: Field
  onClick: (coords: Coordinates) => void
  onContextMenu: (coords: Coordinates) => void
}

const GridContainer = styled.div<{size: number}>`
  display: grid;
  grid-template-columns: ${({size}) => `repeat(${size}, 2rem)`};
`

const Grid = ({field, ...rest}: GridProps) => {
  return <GridContainer size={field.length}>
    {field.map((row: any[], i: any) => {
      return row.map((col, j) => {
        return <Cell key={`${i}-${j}`} type={col} coords={[i, j]} {...rest}/>
      })
    })}
  </GridContainer>
}

export default Grid