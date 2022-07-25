import React, { useState } from 'react'
import tw from 'twin.macro'

const Button = tw.button`text-xl cursor-pointer border border-slate-800 bg-slate-600`

export interface ResetProps {
  onReset: () => void
}

const Reset = ({ onReset }: ResetProps) => {
  const [mouseDown, setMouseDown] = useState(false)

  const onMouseUp = () => setMouseDown(false)
  const onMouseDown = () => setMouseDown(true)

  const handleReset = () => {
    onMouseDown()
    onReset()
  }

  return (
    <Button onMouseDown={handleReset} onMouseUp={onMouseUp}>
      {mouseDown ? '😲' : '🙂'}
    </Button>
  )
}

export default Reset
