import {fireEvent, render, screen} from '@testing-library/react'
import { userEvent } from '@storybook/testing-library'
import Reset from './Reset'

describe('Reset Button', function () {
  const ResetWithDummyHandlerOnReset = () => <Reset onReset={() => null}/>
  it('should render elements with default state', function () {
    render(ResetWithDummyHandlerOnReset())
    const button = screen.getByText("🙂")
    expect(button).toBeInTheDocument()
  })

  it('should execute onReset when clicked', async function () {
    const onReset = jest.fn()
    render(<Reset onReset={onReset} />)
    const button = screen.getByText("🙂")
    await userEvent.click(button)
    expect(onReset).toHaveBeenCalledTimes(1)
  })

  it('should update button text on mouseDown', function () {
    render(ResetWithDummyHandlerOnReset())
    fireEvent.mouseDown(screen.getByText("🙂"))
    expect(screen.getByText("😲")).toBeInTheDocument()
    fireEvent.mouseUp(screen.getByText("😲"))
    expect(screen.getByText("🙂")).toBeInTheDocument()
  })

  it('should update button text on mouseLeave', function () {
    render(ResetWithDummyHandlerOnReset())
    fireEvent.mouseDown(screen.getByText("🙂"))
    expect(screen.getByText("😲")).toBeInTheDocument()
    fireEvent.mouseLeave(screen.getByText("😲"))
    expect(screen.getByText("🙂")).toBeInTheDocument()
  })
})
