import App from './App';
import { render, screen } from '@testing-library/react';

const appContent = 'Main page';

test('Example test', async () => {
  render(<App />);
  expect(screen.getByText(appContent)).toBeDefined();
});
