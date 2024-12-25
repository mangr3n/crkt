import { describe, it, expect } from 'vitest'

// Simple utility function to test our setup
export const add = (a: number, b: number): number => a + b

describe('Math Utils', () => {
  it('should correctly add two numbers', () => {
    expect(add(2, 3)).toBe(5)
    expect(add(-1, 1)).toBe(0)
    expect(add(0, 0)).toBe(0)
  })
})
