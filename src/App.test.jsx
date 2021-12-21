import { describe, expect, it, test, afterEach } from 'vitest'
import { render, cleanup } from '@testing-library/react'
import renderer from 'react-test-renderer'
import { SimpleText } from './App'

afterEach(cleanup)

describe('all test', () => {
  it('basic', () => {
    expect('JOHN'.toLowerCase()).to.equal('john')
  })

  it('sums up two values', () => {
    function sum (x, y) {
      return x + y
    }
    expect(sum(2, 4)).toBe(6)
  })
  it('basic react', () => {
    renderer.create(<div>Hello</div>)
  })

  it('basic react with testing library', () => {
    const { getByText } = render(<SimpleText />)
    expect(getByText('Hello World')).toBeTruthy()
  })
})
