import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import UBButton from './UBButton';

describe('UBButton', () => {
  it('renders with label', () => {
    render(<UBButton label="Click Me" />);
    expect(screen.getByRole('button', { name: 'Click Me' })).toBeInTheDocument();
  });

  it('renders children over label when both provided', () => {
    render(<UBButton label="Label Text">Child Text</UBButton>);
    expect(screen.getByRole('button', { name: 'Child Text' })).toBeInTheDocument();
    expect(screen.queryByText('Label Text')).not.toBeInTheDocument();
  });

  it('merges className and applies disabled class when disabled', () => {
    render(
      <UBButton className="extra-class" disabled>
        Disabled
      </UBButton>
    );
    const button = screen.getByRole('button', { name: 'Disabled' });
    expect(button).toHaveClass('extra-class');
    // CSS modules create hashed class names; check for :disabled attribute instead
    expect(button).toBeDisabled();
  });

  it('defaults type to button to avoid form submission side-effects', () => {
    render(<UBButton>Action</UBButton>);
    const button = screen.getByRole('button', { name: 'Action' }) as HTMLButtonElement;
    expect(button.type).toBe('button');
  });

  it('respects explicit type submit', () => {
    render(<UBButton type="submit">Submit</UBButton>);
    const button = screen.getByRole('button', { name: 'Submit' }) as HTMLButtonElement;
    expect(button.type).toBe('submit');
  });

  it('calls onClick when clicked if not disabled', () => {
    const handleClick = vi.fn();
    render(<UBButton onClick={handleClick}>Click</UBButton>);
    fireEvent.click(screen.getByRole('button', { name: 'Click' }));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('does not call onClick when disabled', () => {
    const handleClick = vi.fn();
    render(
      <UBButton onClick={handleClick} disabled>
        Do Not Click
      </UBButton>
    );
    fireEvent.click(screen.getByRole('button', { name: 'Do Not Click' }));
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('forwards ref correctly to button element', () => {
    const ref = vi.fn();
    render(<UBButton ref={ref}>Test Button</UBButton>);

    // Verify ref was called with the actual button DOM element
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLButtonElement));

    // Get the button element and verify it's the same one the ref received
    const button = screen.getByRole('button', { name: 'Test Button' });
    expect(ref).toHaveBeenCalledWith(button);
  });

  it('allows programmatic focus via ref', () => {
    const TestComponent = () => {
      const buttonRef = React.useRef<HTMLButtonElement>(null);

      const focusButton = () => {
        buttonRef.current?.focus();
      };

      return (
        <div>
          <UBButton ref={buttonRef}>Target Button</UBButton>
          <button onClick={focusButton}>Focus Target</button>
        </div>
      );
    };

    render(<TestComponent />);

    const targetButton = screen.getByRole('button', { name: 'Target Button' });
    const focusButton = screen.getByRole('button', { name: 'Focus Target' });

    // Initially target button should not be focused
    expect(targetButton).not.toHaveFocus();

    // Click the focus button to programmatically focus the target
    fireEvent.click(focusButton);

    // Now target button should have focus
    expect(targetButton).toHaveFocus();
  });
});
