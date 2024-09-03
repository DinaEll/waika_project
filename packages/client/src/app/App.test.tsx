import { render, screen } from '@testing-library/react';
import { App } from './App';

const appContent = 'Main page';

test('Example test', () => {
  render(<App />);
  expect(screen.getByText(appContent)).toBeDefined();
});
