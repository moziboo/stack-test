import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import UBCheckbox from './UBCheckbox';

describe('UBCheckbox', () => {
  it('renders checkbox with label', () => {
    render(<UBCheckbox checked={false} label="Accept terms" />);
    
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
    expect(screen.getByLabelText('Accept terms')).toBeInTheDocument();
  });

  it('renders checkbox without label', () => {
    render(<UBCheckbox checked={false} />);
    
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
    expect(screen.queryByRole('text')).not.toBeInTheDocument();
  });

  it('renders checked state correctly', () => {
    render(<UBCheckbox checked={true} label="Accept terms" />);
    
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeChecked();
  });

  it('renders unchecked state correctly', () => {
    render(<UBCheckbox checked={false} label="Accept terms" />);
    
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).not.toBeChecked();
  });

  it('calls onCheckedChange when clicked', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    
    render(
      <UBCheckbox 
        checked={false} 
        onCheckedChange={handleChange} 
        label="Accept terms" 
      />
    );
    
    const checkbox = screen.getByRole('checkbox');
    await user.click(checkbox);
    
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith(true);
  });

  it('calls onCheckedChange when label is clicked', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    
    render(
      <UBCheckbox 
        checked={false} 
        onCheckedChange={handleChange} 
        label="Accept terms" 
      />
    );
    
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
    render(<UBCheckbox checked={false} label="Accept terms" id="custom-id" />);
    
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toHaveAttribute('id', 'custom-id');
    
    const label = screen.getByText('Accept terms');
    expect(label).toHaveAttribute('for', 'custom-id');
  });

  it('uses default id when not provided', () => {
    render(<UBCheckbox checked={false} label="Accept terms" />);
    
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toHaveAttribute('id', 'c1');
    
    const label = screen.getByText('Accept terms');
    expect(label).toHaveAttribute('for', 'c1');
  });

  it('has correct accessibility attributes', () => {
    render(<UBCheckbox checked={true} label="Accept terms" />);
    
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toHaveAttribute('aria-checked', 'true');
  });

  it('toggles between checked and unchecked states', async () => {
    const user = userEvent.setup();
    let checked = false;
    const handleChange = vi.fn((newChecked: boolean) => {
      checked = newChecked;
    });
    
    const { rerender } = render(
      <UBCheckbox 
        checked={checked} 
        onCheckedChange={handleChange} 
        label="Accept terms" 
      />
    );
    
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).not.toBeChecked();
    
    // Click to check
    await user.click(checkbox);
    expect(handleChange).toHaveBeenCalledWith(true);
    
    // Re-render with new state
    rerender(
      <UBCheckbox 
        checked={true} 
        onCheckedChange={handleChange} 
        label="Accept terms" 
      />
    );
    
    expect(checkbox).toBeChecked();
    
    // Click to uncheck
    await user.click(checkbox);
    expect(handleChange).toHaveBeenCalledWith(false);
  });
}); 