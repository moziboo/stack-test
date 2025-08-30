import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import UBInput from './UBInput';

describe('UBInput', () => {
  it('renders input with label', () => {
    render(<UBInput label="Username" />);

    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByLabelText('Username')).toBeInTheDocument();
  });

  it('renders input without label', () => {
    render(<UBInput placeholder="Enter text" />);

    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument();

    // Check that no label element exists
    expect(screen.queryByRole('label')).not.toBeInTheDocument();
  });

  it('renders with correct input type', () => {
    render(<UBInput type="email" label="Email" />);

    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('type', 'email');
  });

  it('renders with placeholder text', () => {
    render(<UBInput placeholder="Enter your name" />);

    expect(screen.getByPlaceholderText('Enter your name')).toBeInTheDocument();
  });

  it('respects disabled state', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(<UBInput label="Username" disabled />);

    const input = screen.getByRole('textbox');
    expect(input).toBeDisabled();

    await user.click(input);
    expect(handleChange).not.toHaveBeenCalled();
  });

  it('renders required attribute correctly', () => {
    render(<UBInput label="Username" required />);

    const input = screen.getByRole('textbox');
    expect(input).toBeRequired();
  });

  it('renders readonly state correctly', () => {
    render(<UBInput label="Username" readOnly value="test" />);

    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('readonly');
  });

  it('calls onChange when value changes', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(<UBInput label="Username" onChange={handleChange} />);

    const input = screen.getByRole('textbox');
    await user.type(input, 'test');

    expect(handleChange).toHaveBeenCalledTimes(4);
    // Now onChange receives the event, not just the value
    expect(handleChange).toHaveBeenLastCalledWith(
      expect.objectContaining({
        target: expect.objectContaining({ value: 'test' }),
      })
    );
  });

  it('calls onFocus when input receives focus', async () => {
    const user = userEvent.setup();
    const handleFocus = vi.fn();

    render(<UBInput label="Username" onFocus={handleFocus} />);

    const input = screen.getByRole('textbox');
    await user.click(input);

    expect(handleFocus).toHaveBeenCalledTimes(1);
  });

  it('calls onBlur when input loses focus', async () => {
    const user = userEvent.setup();
    const handleBlur = vi.fn();

    render(
      <div>
        <UBInput label="Username" onBlur={handleBlur} />
        <button>Other element</button>
      </div>
    );

    const input = screen.getByRole('textbox');
    const button = screen.getByRole('button');

    await user.click(input);
    await user.click(button);

    expect(handleBlur).toHaveBeenCalledTimes(1);
  });

  it('renders with default value', () => {
    render(<UBInput label="Username" defaultValue="john_doe" />);

    const input = screen.getByRole('textbox');
    expect(input).toHaveValue('john_doe');
  });

  it('renders controlled value', () => {
    render(<UBInput label="Username" value="controlled_value" onChange={vi.fn()} />);

    const input = screen.getByRole('textbox');
    expect(input).toHaveValue('controlled_value');
  });

  it('renders with custom id', () => {
    render(<UBInput label="Username" id="custom-id" />);

    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('id', 'custom-id');
  });

  it('generates unique id when none provided', () => {
    render(
      <div>
        <UBInput label="First" />
        <UBInput label="Second" />
      </div>
    );

    const inputs = screen.getAllByRole('textbox');
    expect(inputs[0]).toHaveAttribute('id');
    expect(inputs[1]).toHaveAttribute('id');
    expect(inputs[0].getAttribute('id')).not.toBe(inputs[1].getAttribute('id'));
  });

  it('renders with additional HTML attributes', () => {
    render(
      <UBInput
        label="Username"
        name="username"
        maxLength={20}
        minLength={3}
        pattern="[a-zA-Z]+"
        autoComplete="username"
      />
    );

    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('name', 'username');
    expect(input).toHaveAttribute('maxlength', '20');
    expect(input).toHaveAttribute('minlength', '3');
    expect(input).toHaveAttribute('pattern', '[a-zA-Z]+');
    expect(input).toHaveAttribute('autocomplete', 'username');
  });

  it('associates label with input correctly', () => {
    render(<UBInput label="Username" />);

    const input = screen.getByRole('textbox');
    const label = screen.getByText('Username');

    expect(label).toHaveAttribute('for', input.getAttribute('id'));
  });

  it('label displays required asterisk', () => {
    render(<UBInput required label="Username" />);

    const label = screen.getByText('Username *');

    expect(label).toBeInTheDocument();
  });

  it('forwards ref correctly to input element', () => {
    const ref = vi.fn();
    render(<UBInput ref={ref} />);

    // Verify ref was called with the actual input DOM element
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLInputElement));

    // Get the input element and verify it's the same one the ref received
    const input = screen.getByRole('textbox');
    expect(ref).toHaveBeenCalledWith(input);
  });
});
