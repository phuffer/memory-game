import React from 'react'
import { render } from '@testing-library/react'
import MemoryGameContainer from './MemoryGameContainer'

test('game size cannot be less than 4', () => {
  try {
    render(<MemoryGameContainer size={3} />)
  } catch (e) {
    expect(e.message).toContain('Game size must be 4 or greater')
  }
})

test('game size must be divisible by difficulty', () => {
  try {
    render(<MemoryGameContainer size={24} difficulty={5} />)
  } catch (e) {
    expect(e.message).toContain('Game size 24 must be divisible by 5')
  }
})
