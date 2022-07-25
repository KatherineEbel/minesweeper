import tw from 'twin.macro'
import Counter from './Counter'
import Level from './Level'
import Reset from './Reset'

export interface HudProps {
  time: string
  levels: string[]
  mines: string
  onReset: () => void
}

const HudContainer = tw.header`flex w-full pb-4 items-center justify-between`

const Hud = ({ time, levels, mines, onReset}: HudProps) => {
  return (
    <HudContainer>
      <Counter value={time}/>
      <Level levels={levels}/>
      <Reset onReset={onReset}/>
      <Counter value={mines}/>
    </HudContainer>
  )
}

export default Hud
