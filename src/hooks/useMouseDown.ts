import {useCallback, useState} from 'react'

type OnMouseDownHandler = () => void
type OnMouseUpHandler = () => void

export const useMouseDown = (): [boolean, OnMouseUpHandler, OnMouseDownHandler] => {
  const [mouseDown, setMouseDown] = useState(false)

  const onMouseUp = useCallback(() => setMouseDown(false), [])
  const onMouseDown = useCallback(() => setMouseDown(true), [])
  return [mouseDown, onMouseUp, onMouseDown]
}