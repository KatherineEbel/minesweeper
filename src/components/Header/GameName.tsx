import React from 'react'
import tw from 'twin.macro'

export interface GameNameProps {
  text: string
}

const StyledH1 = tw.h1`text-3xl font-display tracking-wider mb-4`

const GameName = ({ text }: GameNameProps) => {
  return <StyledH1>{text}</StyledH1>
}

export default GameName
