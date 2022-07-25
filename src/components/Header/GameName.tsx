import React from 'react'
import { styled } from 'twin.macro'

export interface GameNameProps {
  text: string
}

const StyledH1 = styled.h1`
  font-size: 2em;
`

const GameName = ({ text }: GameNameProps) => {
  return <StyledH1>{text}</StyledH1>
}

export default GameName
