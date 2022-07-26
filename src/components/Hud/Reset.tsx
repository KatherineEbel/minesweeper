import React from 'react'
import tw from 'twin.macro'
import {useMouseDown} from '@/hooks/useMouseDown'

const Button = tw.button`text-xl cursor-pointer border border-slate-800 bg-slate-600 p-1`

export interface ResetProps {
  onReset: () => void
}

const Reset = ({ onReset }: ResetProps) => {
  const [mouseDown, onMouseUp, onMouseDown] = useMouseDown()

  const handleReset = () => {
    onMouseDown()
    onReset()
  }

  return (
    <Button onMouseDown={handleReset} onMouseUp={onMouseUp} onMouseLeave={onMouseUp}>
      {mouseDown ? '😲' : '🙂'}
    </Button>
  )
}

export default Reset
