import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import App from './App'

describe('App', () => {
  it('renders without crashing', () => {
    render(<App />)
    // If the component renders without throwing, this test passes
  })

  it('renders the Home component', () => {
    render(<App />)
    // Check if the Home component content is rendered
    expect(screen.getByText('Home Page')).toBeInTheDocument()
  })

  it('toggles theme when the theme button is clicked', () => {
    render(<App />)
    
    // Find the theme toggle button
    const themeButton = screen.getByText(/Switch to dark mode/i)
    expect(themeButton).toBeInTheDocument()
    
    // Click the button to toggle theme
    fireEvent.click(themeButton)
    
    // Button text should now indicate switching to light mode
    expect(screen.getByText(/Switch to light mode/i)).toBeInTheDocument()
    
    // Click again to toggle back
    fireEvent.click(screen.getByText(/Switch to light mode/i))
    
    // Button text should now indicate switching to dark mode again
    expect(screen.getByText(/Switch to dark mode/i)).toBeInTheDocument()
  })
}) 