import React, {memo} from 'react'
import tw from 'twin.macro'

import Legend, { LegendProps } from './Legend'
import GameName, { GameNameProps } from './GameName'

const StyledHeader = tw.header`text-center relative inline-block`

export type HeaderProps = GameNameProps & LegendProps
const Header = memo(({ text, ...legendProps }: HeaderProps) => {
  return (
    <StyledHeader>
      <GameName text={text} />
      <Legend {...legendProps} />
    </StyledHeader>
  )
})

Header.displayName = 'Header'

export default Header
