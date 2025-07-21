import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { AppProvider, AppContext } from './AppContext';
import { useContext } from 'react';

// Test component that uses the context
const TestComponent = () => {
  const { theme, toggleTheme } = useContext(AppContext)!;

  return (
    <div>
      <div data-testid="theme-value">{theme}</div>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
};

describe('AppContext', () => {
  it('provides the default theme value', () => {
    render(
      <AppProvider>
        <TestComponent />
      </AppProvider>
    );

    expect(screen.getByTestId('theme-value').textContent).toBe('light');
  });

  it('toggles the theme when the function is called', () => {
    render(
      <AppProvider>
        <TestComponent />
      </AppProvider>
    );

    // Initial theme should be light
    expect(screen.getByTestId('theme-value').textContent).toBe('light');

    // Click the toggle button
    fireEvent.click(screen.getByText('Toggle Theme'));

    // Theme should now be dark
    expect(screen.getByTestId('theme-value').textContent).toBe('dark');

    // Click the toggle button again
    fireEvent.click(screen.getByText('Toggle Theme'));

    // Theme should be back to light
    expect(screen.getByTestId('theme-value').textContent).toBe('light');
  });
});
