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
});
