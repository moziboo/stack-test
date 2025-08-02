import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';
import UBRadioGroup from './UBRadioGroup';

describe('UBRadioGroup', () => {
  it('renders radio group with options', () => {
    const mockOnChange = vi.fn();

    render(
      <UBRadioGroup
        value="first"
        onValueChange={mockOnChange}
        options={[
          { value: 'first', label: 'First' },
          { value: 'second', label: 'Second' },
        ]}
      />
    );

    const radioGroup = screen.getByRole('radiogroup');
    expect(radioGroup).toBeInTheDocument();

    const radioButtons = screen.getAllByRole('radio');
    expect(radioButtons).toHaveLength(2);
  });

  it('renders radio group with specified value selected', () => {
    const mockOnChange = vi.fn();

    render(
      <UBRadioGroup
        value="second"
        onValueChange={mockOnChange}
        options={[
          { value: 'first', label: 'First' },
          { value: 'second', label: 'Second' },
        ]}
      />
    );

    const radioButtons = screen.getAllByRole('radio');
    expect(radioButtons[1]).toBeChecked();
  });

  it('respects disabled state', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(
      <UBRadioGroup
        value="first"
        onValueChange={handleChange}
        options={[
          { value: 'first', label: 'First' },
          { value: 'second', label: 'Second' },
        ]}
        disabled={true}
      />
    );

    const radioButtons = screen.getAllByRole('radio');
    expect(radioButtons[0]).toBeDisabled();
    expect(radioButtons[1]).toBeDisabled();

    await user.click(radioButtons[0]);
    expect(handleChange).not.toHaveBeenCalled();
  });

  it('calls onValueChange when user selects different option', async () => {
    const user = userEvent.setup();
    const mockOnChange = vi.fn();

    render(
      <UBRadioGroup
        value="first"
        onValueChange={mockOnChange}
        options={[
          { value: 'first', label: 'First' },
          { value: 'second', label: 'Second' },
        ]}
      />
    );

    const radioButtons = screen.getAllByRole('radio');
    await user.click(radioButtons[1]); // Click "Second"

    expect(mockOnChange).toHaveBeenCalledWith('second');
  });

  // Approach 2: Test with useState wrapper for integration testing
  it('handles state changes correctly with useState wrapper', async () => {
    const user = userEvent.setup();

    const TestWrapper = () => {
      const [value, setValue] = useState('first');
      return (
        <UBRadioGroup
          value={value}
          onValueChange={setValue}
          options={[
            { value: 'first', label: 'First' },
            { value: 'second', label: 'Second' },
          ]}
        />
      );
    };

    render(<TestWrapper />);

    const radioButtons = screen.getAllByRole('radio');

    // Initially first should be selected
    expect(radioButtons[0]).toBeChecked();
    expect(radioButtons[1]).not.toBeChecked();

    // Click second option
    await user.click(radioButtons[1]);

    // Now second should be selected
    expect(radioButtons[0]).not.toBeChecked();
    expect(radioButtons[1]).toBeChecked();
  });

  it('applies correct direction classes', () => {
    const mockOnChange = vi.fn();

    const { rerender } = render(
      <UBRadioGroup
        value="first"
        onValueChange={mockOnChange}
        options={[{ value: 'first', label: 'First' }]}
        direction="column"
      />
    );

    const radioGroup = screen.getByRole('radiogroup');
    // Test that the CSS module class is applied (partial match)
    expect(radioGroup.className).toMatch(/column/);

    rerender(
      <UBRadioGroup
        value="first"
        onValueChange={mockOnChange}
        options={[{ value: 'first', label: 'First' }]}
        direction="row"
      />
    );

    expect(radioGroup.className).toMatch(/row/);
  });
});
