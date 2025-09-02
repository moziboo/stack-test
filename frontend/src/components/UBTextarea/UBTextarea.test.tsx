import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import UBTextarea from './UBTextarea';

describe('UBTextarea', () => {
  it('renders textarea with label', () => {
    render(<UBTextarea label="Test Label" />);

    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByLabelText('Test Label')).toBeInTheDocument();
  });

  it('renders textarea without label', () => {
    render(<UBTextarea />);

    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.queryByRole('label')).not.toBeInTheDocument();
  });

  it('displays placeholder text', () => {
    render(<UBTextarea placeholder="Enter text here" />);

    expect(screen.getByPlaceholderText('Enter text here')).toBeInTheDocument();
  });

  it('handles text input', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(<UBTextarea onChange={handleChange} />);

    const textarea = screen.getByRole('textbox');
    await user.type(textarea, 'Hello world');

    expect(handleChange).toHaveBeenCalled();
    expect(textarea).toHaveValue('Hello world');
  });

  it('displays initial value', () => {
    render(<UBTextarea defaultValue="Initial content" />);

    expect(screen.getByRole('textbox')).toHaveValue('Initial content');
  });

  it('applies disabled styles when disabled', () => {
    render(<UBTextarea disabled label="Test" />);

    const textarea = screen.getByRole('textbox');
    expect(textarea).toBeDisabled();
    expect(textarea.className).toMatch(/disabled/);
  });

  it('applies readOnly styles when readOnly', () => {
    render(<UBTextarea readOnly label="Test" />);

    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveAttribute('readonly');
    expect(textarea.className).toMatch(/readOnly/);
  });

  it('applies resize class correctly', () => {
    render(<UBTextarea resize="none" />);

    const textarea = screen.getByRole('textbox');
    expect(textarea.className).toMatch(/none/);
  });

  it('sets correct number of rows', () => {
    render(<UBTextarea rows={6} />);

    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveAttribute('rows', '6');
  });

  it('defaults to 4 rows when not specified', () => {
    render(<UBTextarea />);

    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveAttribute('rows', '4');
  });

  it('forwards ref correctly', () => {
    const ref = vi.fn();
    render(<UBTextarea ref={ref} />);

    expect(ref).toHaveBeenCalledWith(expect.any(HTMLTextAreaElement));
  });

  it('applies custom className', () => {
    render(<UBTextarea className="custom-class" />);

    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveClass('custom-class');
  });

  it('generates unique id when not provided', () => {
    render(<UBTextarea label="Test" />);

    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveAttribute('id');
  });

  it('uses provided id when given', () => {
    render(<UBTextarea id="custom-id" label="Test" />);

    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveAttribute('id', 'custom-id');
  });

  it('supports maxLength attribute', () => {
    render(<UBTextarea maxLength={100} />);

    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveAttribute('maxlength', '100');
  });

  it('supports required attribute', () => {
    render(<UBTextarea required />);

    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveAttribute('required');
  });

  it('prevents input when disabled', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(<UBTextarea disabled onChange={handleChange} />);

    const textarea = screen.getByRole('textbox');
    await user.type(textarea, 'Should not work');

    expect(handleChange).not.toHaveBeenCalled();
    expect(textarea).toHaveValue('');
  });
});
