import { beforeAll, afterAll, afterEach } from 'vitest'
import { setupServer } from 'msw/node'
import { rest } from 'msw'
import { it, expect } from 'vitest'
import {
  render,
  screen,
  userEvent,
  waitForElementToBeRemoved
} from './setup-test'
import { QueryClientProvider, QueryClient } from 'react-query'
import { Actor } from './Actor'

const data = {
  results: [
    {
      name: {
        first: 'John',
        last: 'Doe'
      }
    }
  ]
}

export const restHandlers = [
  rest.get('https://randomuser.me/api/', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(data))
  })
]

const server = setupServer(...restHandlers)

// Start server before all tests
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))

//  Close server after all tests
afterAll(() => server.close())

// Reset handlers after each test `important for test isolation`
afterEach(() => server.resetHandlers())

it('basic mock server', async () => {
  const queryClient = new QueryClient()
  render(
    <QueryClientProvider client={queryClient}>
      <Actor />
    </QueryClientProvider>
  )
  expect(screen.queryByText('Loading...')).toBeTruthy()
  await waitForElementToBeRemoved(() => screen.queryByText('Loading...'))
  expect(screen.getByText('John')).toBeTruthy()
})
