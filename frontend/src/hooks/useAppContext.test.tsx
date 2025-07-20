import { renderHook, act } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { useAppContext } from './useAppContext'
import { AppProvider } from '../context/AppContext'

describe('useAppContext', () => {
  it('throws an error when used outside of AppProvider', () => {
    // Expect the hook to throw an error when used outside of AppProvider
    expect(() => {
      renderHook(() => useAppContext())
    }).toThrow('useAppContext must be used within an AppProvider')
  })

  it('returns the context values when used within AppProvider', () => {
    // Wrap the hook with AppProvider
    const { result } = renderHook(() => useAppContext(), {
      wrapper: ({ children }) => <AppProvider>{children}</AppProvider>
    })

    // Check if the hook returns the expected values
    expect(result.current.theme).toBe('light')
    expect(typeof result.current.toggleTheme).toBe('function')
  })

  it('toggles the theme when toggleTheme is called', () => {
    // Wrap the hook with AppProvider
    const { result } = renderHook(() => useAppContext(), {
      wrapper: ({ children }) => <AppProvider>{children}</AppProvider>
    })

    // Initial theme should be light
    expect(result.current.theme).toBe('light')

    // Toggle the theme
    act(() => {
      result.current.toggleTheme()
    })

    // Theme should now be dark
    expect(result.current.theme).toBe('dark')

    // Toggle the theme again
    act(() => {
      result.current.toggleTheme()
    })

    // Theme should be back to light
    expect(result.current.theme).toBe('light')
  })
}) 