import { useState} from 'react'

type OnMouseDownHandler = () => void
type OnMouseUpHandler = () => void

export const useMouseDown = (): [boolean, OnMouseUpHandler, OnMouseDownHandler] => {
  const [mouseDown, setMouseDown] = useState(false)

  const onMouseUp = () => setMouseDown(false)
  const onMouseDown = () => setMouseDown(true)
  return [mouseDown, onMouseUp, onMouseDown]
}