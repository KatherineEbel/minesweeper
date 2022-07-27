import tw, {styled} from 'twin.macro'

interface ContainerProps {
  won: boolean | null
}

const Container = styled.div<ContainerProps>`
  display: grid;
  place-items: center;
  top: 65%;
  left: 50%;
  z-index: 11;
  width: 7rem;
  height: 7rem;
  font-size: 5rem;
  line-height: 5rem;
  position: absolute;
  transform: translate(-50%, -50%) scale(${({won}) => won === null ? 0 : 1});
  transition: transform 500ms ease-in-out;
  ${tw`rounded-full bg-slate-800 shadow-xl`}
`

interface GameOverProps extends ContainerProps {
  onClick: () => void
}

const GameOver = ({onClick, won}: GameOverProps) => {
  return (<Container onClick={onClick} won={won}>
    {won ? '😎' : '🤕'}
  </Container>)
}

export default GameOver