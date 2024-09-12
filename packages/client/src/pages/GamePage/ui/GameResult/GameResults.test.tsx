import { render, screen, fireEvent } from '@testing-library/react';
import { ResultStatus } from '../../model/gamePageData';
import { GameResult } from './GameResults';

describe('GameResult', () => {
  const onPlayAgainClickMock = jest.fn();

  beforeEach(() => {
    onPlayAgainClickMock.mockClear();
  });

  it('should render "Congratulations" when player wins', () => {
    const mockResults = { status: ResultStatus.win, time: '12:45' };

    render(
      <GameResult
        onPlayAgainClick={onPlayAgainClickMock}
        results={mockResults}
      />,
    );

    expect(screen.getByText('Congratulations')).toBeTruthy();
    expect(screen.getByText('Your Result')).toBeTruthy();
    expect(screen.getByText('12:45')).toBeTruthy();
    expect(screen.getByText('12:01')).toBeTruthy();
    expect(screen.getByText('🏆')).toBeTruthy();
  });

  it('should render "Sorry, but you lose :(" when player loses', () => {
    const mockResults = { status: ResultStatus.lose, time: '15:00' };

    render(
      <GameResult
        onPlayAgainClick={onPlayAgainClickMock}
        results={mockResults}
      />,
    );

    expect(screen.getByText('Sorry, but you lose :(')).toBeTruthy();
    expect(screen.queryByText('Your Result')).toBeNull();
    expect(screen.getByText('12:01')).toBeTruthy();
    expect(screen.getByText('😢')).toBeTruthy();
  });

  it('should call onPlayAgainClick when "Play again" button is clicked', () => {
    render(
      <GameResult onPlayAgainClick={onPlayAgainClickMock} results={null} />,
    );

    const playAgainButton = screen.getByText('Play again');
    fireEvent.click(playAgainButton);

    expect(onPlayAgainClickMock).toHaveBeenCalledTimes(1);
  });

  it('should render best result as 12:01', () => {
    render(
      <GameResult onPlayAgainClick={onPlayAgainClickMock} results={null} />,
    );

    expect(screen.getByText('12:01')).toBeTruthy();
  });
});
