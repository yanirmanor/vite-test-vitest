import { beforeAll, afterAll, afterEach } from 'vitest'
import { setupServer } from 'msw/node'
import { rest } from 'msw'
import { it, expect, vi } from 'vitest'
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

it('basic function mock', async () => {
  const mockFnSimple = vi.fn(() => 'Hello World')
  expect(await mockFnSimple()).toBe('Hello World')
})

it('override mock value', () => {
  const mockFnOverrideValue = vi.fn()
  mockFnOverrideValue.mockReturnValue(23)
  expect(mockFnOverrideValue()).toBe(23)
  mockFnOverrideValue.mockReturnValue(41)
  expect(mockFnOverrideValue()).toBe(41)
})

it('mock implementation', () => {
  const mockFnGetSum = vi.fn().mockImplementation(sum => sum * 3.14)
  const total = mockFnGetSum(100)
  expect(total).toBe(314)
})
