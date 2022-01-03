import { useState } from 'react'
import './App.css'
import { QueryClientProvider, QueryClient } from 'react-query'
import { Actor } from './Actor'
import { setupWorker, rest } from 'msw'

if (import.meta.env.VITE_MOCKING === true) {
  const handlers = [
    rest.get('https://randomuser.me/api/', (req, res, ctx) => {
      return res(
        ctx.delay(1000),
        ctx.status(202, 'Mocked status'),
        ctx.json({
          results: [
            {
              name: {
                first: 'John',
                last: 'Doe'
              }
            }
          ]
        })
      )
    })
  ]

  const worker = setupWorker(...handlers)
  worker.start()
}

const queryClient = new QueryClient()

export function SimpleText () {
  return <h1>Hello World</h1>
}
function App () {
  const [count, setCount] = useState(0)

  return (
    <QueryClientProvider client={queryClient}>
      <div className='App'>
        <Actor />
      </div>
    </QueryClientProvider>
  )
}

export default App
