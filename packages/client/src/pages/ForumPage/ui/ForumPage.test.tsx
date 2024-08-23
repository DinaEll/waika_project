import { render, screen } from '@testing-library/react'
import { ForumPage } from './ForumPage'

const appContent = 'ForumPage'

test('Example test', async () => {
  render(<ForumPage />)

  expect(screen.getByText(appContent)).toBeDefined()
})
