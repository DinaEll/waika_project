import { render, act } from '@testing-library/react';
import { GameTimer } from './GameTimer';

describe('GameTimer', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2024-05-01T12:00:00Z'));
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should render initial time as 00:00', () => {
    const { getByText } = render(<GameTimer />);
    expect(getByText('00:00')).toBeTruthy();
  });

  it('should start timer when startTime is provided', () => {
    const { getByText } = render(
      <GameTimer startTime="2024-05-01T12:00:00Z" />,
    );
    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(getByText('00:01')).toBeTruthy();
  });

  it('should stop timer when finishTime is provided', () => {
    const { getByText } = render(
      <GameTimer
        startTime="2024-05-01T12:00:00Z"
        finishTime="2024-05-01T12:00:01Z"
      />,
    );
    act(() => {
      jest.advanceTimersByTime(2000);
    });

    expect(getByText('00:01')).toBeTruthy();
  });
});
