import { act, render, screen } from '@testing-library/react'
import { ForumPage } from './ForumPage'

const appContent = 'ForumPage'

// @ts-ignore
// global.fetch = jest.fn(() =>
//   Promise.resolve({ json: () => Promise.resolve('hey') })
// )

test('Example test', async () => {
  render(<ForumPage />)

  expect(screen.getByText(appContent)).toBeDefined()
})
