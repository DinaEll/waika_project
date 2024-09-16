import { render, screen, fireEvent } from '@testing-library/react';
import { GameStartup } from './GameStartup';

describe('GameStartup', () => {
  const onStartClickMock = jest.fn();

  beforeEach(() => {
    onStartClickMock.mockClear();
  });

  it('should render the "Start game" modal title', () => {
    render(<GameStartup onStartClick={onStartClickMock} />);

    expect(screen.getByText('Start game')).toBeTruthy();
  });

  it('should call onStartClick when the "Start" button is clicked', () => {
    render(<GameStartup onStartClick={onStartClickMock} />);

    const startButton = screen.getByText('Start');
    fireEvent.click(startButton);

    expect(onStartClickMock).toHaveBeenCalledTimes(1);
  });

  it('should render the "Start" button', () => {
    render(<GameStartup onStartClick={onStartClickMock} />);

    const startButton = screen.getByText('Start');
    expect(startButton).toBeTruthy();
  });
});
