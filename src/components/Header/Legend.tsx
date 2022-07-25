import React from 'react'
import tw from 'twin.macro'

export interface LegendProps {
  /*
   * Feature that should be activated after first+second actions
   * */
  feature: string
  firstAction: string
  secondAction: string
}

const Parent = tw.legend`text-lg mx-auto`

const FlagContainer = tw.code`bg-slate-200`

const FirstAction = tw.span`text-rose-600`

const SecondAction = tw.span`text-sky-600`

const Legend = ({ feature, firstAction, secondAction }: LegendProps) => {
  return (
    <Parent>
      <strong>{feature}: </strong>
      <FlagContainer>
        <FirstAction>{firstAction}</FirstAction>{' '}
        <span className="text-slate-800">+</span>{' '}
        <SecondAction>{secondAction}</SecondAction>
      </FlagContainer>
    </Parent>
  )
}

export default Legend
