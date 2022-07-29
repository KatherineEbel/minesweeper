import tw, {styled} from 'twin.macro'

interface ContainerProps {
  won: boolean | null
}

const Container = styled.div<ContainerProps>`
  z-index: 11;
  width: 7rem;
  height: 7rem;
  font-size: 5rem;
  line-height: 5rem;
  transform: translate(-50%, -50%) scale(${({won}) => won === null ? 0 : 1});
  transition: transform 500ms ease-in-out;
  ${tw`grid place-items-center top-1/2 left-1/2 absolute rounded-full bg-slate-800 shadow-xl cursor-pointer`}
`

interface GameOverProps extends ContainerProps {
  onClick: () => void
}

const GameOver = ({onClick, won}: GameOverProps) => {
  return (<Container won={won}>
    <span onClick={onClick} className='hover:rotate-[360deg] hover:scale-150 transition-transform duration-500'>
    {won ? '😎' : '🤕'}
    </span>
  </Container>)
}

export default GameOver