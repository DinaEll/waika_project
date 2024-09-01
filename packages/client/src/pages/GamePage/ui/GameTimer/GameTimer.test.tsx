import { render, act } from '@testing-library/react'
import { GameTimer } from './GameTimer'

describe('GameTimer', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  it('should start the timer when isRunning is true', () => {
    const { getByText } = render(<GameTimer isRunning={true} />)

    act(() => {
      jest.advanceTimersByTime(3000)
    })
    expect(getByText('00:03')).toBeTruthy()

    act(() => {
      jest.advanceTimersByTime(2000)
    })
    expect(getByText('00:05')).toBeTruthy()
  })

  it('should stop the timer when isRunning is false', () => {
    const { rerender, getByText } = render(<GameTimer isRunning={true} />)

    act(() => {
      jest.advanceTimersByTime(3000)
    })
    rerender(<GameTimer isRunning={false} />)

    act(() => {
      jest.advanceTimersByTime(2000)
    })
    expect(getByText('00:03')).toBeTruthy()
  })

  it('should reset the timer when component unmount', () => {
    const { unmount, getByText } = render(<GameTimer isRunning={true} />)

    act(() => {
      jest.advanceTimersByTime(3000)
    })
    unmount()
    render(<GameTimer isRunning={true} />)

    expect(getByText('00:00')).toBeTruthy()
  })
})
