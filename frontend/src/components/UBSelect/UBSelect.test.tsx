import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import UBSelect from './UBSelect';

const sampleOptions = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry', disabled: true },
];

describe('UBSelect', () => {
  it('renders select with label', () => {
    render(<UBSelect options={sampleOptions} label="Choose fruit" onValueChange={vi.fn()} />);

    expect(screen.getByText('Choose fruit')).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  it('renders select without label', () => {
    render(<UBSelect options={sampleOptions} onValueChange={vi.fn()} />);

    expect(screen.getByRole('combobox')).toBeInTheDocument();
    expect(screen.queryByRole('label')).not.toBeInTheDocument();
  });

  it('shows placeholder when no value selected', () => {
    render(
      <UBSelect options={sampleOptions} placeholder="Select a fruit" onValueChange={vi.fn()} />
    );

    expect(screen.getByText('Select a fruit')).toBeInTheDocument();
  });

  it('displays selected value', () => {
    render(<UBSelect options={sampleOptions} value="banana" onValueChange={vi.fn()} />);

    expect(screen.getByText('Banana')).toBeInTheDocument();
  });

  it('opens dropdown when clicked', async () => {
    const user = userEvent.setup();

    render(<UBSelect options={sampleOptions} onValueChange={vi.fn()} />);

    const trigger = screen.getByRole('combobox');
    await user.click(trigger);

    expect(screen.getByText('Apple')).toBeInTheDocument();
    expect(screen.getByText('Banana')).toBeInTheDocument();
    expect(screen.getByText('Cherry')).toBeInTheDocument();
  });

  it('calls onValueChange when option selected', async () => {
    const user = userEvent.setup();
    const handleValueChange = vi.fn();

    render(<UBSelect options={sampleOptions} onValueChange={handleValueChange} />);

    const trigger = screen.getByRole('combobox');
    await user.click(trigger);

    const option = screen.getByText('Apple');
    await user.click(option);

    expect(handleValueChange).toHaveBeenCalledWith('apple');
  });

  it('shows required asterisk when required', () => {
    render(
      <UBSelect options={sampleOptions} label="Required Field" required onValueChange={vi.fn()} />
    );

    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('disables select when disabled prop is true', () => {
    render(<UBSelect options={sampleOptions} disabled onValueChange={vi.fn()} />);

    const trigger = screen.getByRole('combobox');
    expect(trigger).toHaveAttribute('data-disabled');
  });

  it('applies disabled styles to disabled options', async () => {
    const user = userEvent.setup();

    render(<UBSelect options={sampleOptions} onValueChange={vi.fn()} />);

    const trigger = screen.getByRole('combobox');
    await user.click(trigger);

    const disabledOption = screen.getByText('Cherry');
    expect(disabledOption.closest('[role="option"]')).toHaveAttribute('data-disabled');
  });

  it('generates unique id when not provided', () => {
    render(<UBSelect options={sampleOptions} label="Test" onValueChange={vi.fn()} />);

    const trigger = screen.getByRole('combobox');
    expect(trigger).toHaveAttribute('id');
  });

  it('uses provided id when given', () => {
    render(
      <UBSelect options={sampleOptions} id="custom-id" label="Test" onValueChange={vi.fn()} />
    );

    const trigger = screen.getByRole('combobox');
    expect(trigger).toHaveAttribute('id', 'custom-id');
  });

  it('forwards ref correctly', () => {
    const ref = vi.fn();
    render(<UBSelect ref={ref} options={sampleOptions} onValueChange={vi.fn()} />);

    expect(ref).toHaveBeenCalled();
  });

  it('applies custom className', () => {
    render(<UBSelect options={sampleOptions} className="custom-class" onValueChange={vi.fn()} />);

    const trigger = screen.getByRole('combobox');
    expect(trigger).toHaveClass('custom-class');
  });
});
