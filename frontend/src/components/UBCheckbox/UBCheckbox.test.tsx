import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import UBCheckbox from './UBCheckbox';

describe('UBCheckbox', () => {
  it('renders checkbox with label', () => {
    const handleChange = vi.fn();

    render(<UBCheckbox checked={false} label="Accept terms" onCheckedChange={handleChange} />);

    expect(screen.getByRole('checkbox')).toBeInTheDocument();
    expect(screen.getByLabelText('Accept terms')).toBeInTheDocument();
  });

  it('renders checkbox without label', () => {
    const handleChange = vi.fn();

    render(<UBCheckbox checked={false} onCheckedChange={handleChange} />);

    expect(screen.getByRole('checkbox')).toBeInTheDocument();
    expect(screen.queryByRole('text')).not.toBeInTheDocument();
  });

  it('renders checked state correctly', () => {
    const handleChange = vi.fn();

    render(<UBCheckbox checked={true} label="Accept terms" onCheckedChange={handleChange} />);

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeChecked();
  });

  it('renders unchecked state correctly', () => {
    const handleChange = vi.fn();

    render(<UBCheckbox checked={false} label="Accept terms" onCheckedChange={handleChange} />);

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).not.toBeChecked();
  });

  it('calls onCheckedChange when clicked', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(<UBCheckbox checked={false} onCheckedChange={handleChange} label="Accept terms" />);

    const checkbox = screen.getByRole('checkbox');
    await user.click(checkbox);

    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith(true);
  });

  it('calls onCheckedChange when label is clicked', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(<UBCheckbox checked={false} onCheckedChange={handleChange} label="Accept terms" />);

    const label = screen.getByText('Accept terms');
    await user.click(label);

    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith(true);
  });

  it('respects disabled state', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(
      <UBCheckbox
        checked={false}
        onCheckedChange={handleChange}
        label="Accept terms"
        disabled={true}
      />
    );

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeDisabled();

    await user.click(checkbox);
    expect(handleChange).not.toHaveBeenCalled();
  });

  it('uses custom id when provided', () => {
    const handleChange = vi.fn();

    render(
      <UBCheckbox
        checked={false}
        label="Accept terms"
        id="custom-id"
        onCheckedChange={handleChange}
      />
    );

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toHaveAttribute('id', 'custom-id');

    const label = screen.getByText('Accept terms');
    expect(label).toHaveAttribute('for', 'custom-id');
  });

  it('generates unique id when not provided', () => {
    const handleChange = vi.fn();

    render(<UBCheckbox checked={false} label="Accept terms" onCheckedChange={handleChange} />);

    const checkbox = screen.getByRole('checkbox');
    const checkboxId = checkbox.getAttribute('id');

    // Should have some generated id (not empty)
    expect(checkboxId).toBeTruthy();
    expect(checkboxId).toMatch(/^:/); // React's useId starts with ':'

    const label = screen.getByText('Accept terms');
    expect(label).toHaveAttribute('for', checkboxId);
  });

  it('toggles between checked and unchecked states', async () => {
    const user = userEvent.setup();
    let checked = false;
    const handleChange = vi.fn((newChecked: boolean) => {
      checked = newChecked;
    });

    const { rerender } = render(
      <UBCheckbox checked={checked} onCheckedChange={handleChange} label="Accept terms" />
    );

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).not.toBeChecked();

    // Click to check
    await user.click(checkbox);
    expect(handleChange).toHaveBeenCalledWith(true);

    // Re-render with new state
    rerender(<UBCheckbox checked={true} onCheckedChange={handleChange} label="Accept terms" />);

    expect(checkbox).toBeChecked();

    // Click to uncheck
    await user.click(checkbox);
    expect(handleChange).toHaveBeenCalledWith(false);
  });
});
