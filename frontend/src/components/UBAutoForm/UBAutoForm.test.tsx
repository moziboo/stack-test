import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { UBAutoForm } from './UBAutoForm';
import type { FieldsConfig } from './UBAutoForm';

describe('UBAutoForm', () => {
  const mockOnSubmit = vi.fn();

  interface TestFormData {
    name: string;
    email: string;
    country: string;
    newsletter: boolean;
  }

  const defaultValues: TestFormData = {
    name: '',
    email: '',
    country: '',
    newsletter: false,
  };

  const fields: FieldsConfig<TestFormData> = {
    name: {
      type: 'text',
      label: 'Name',
      required: true,
      placeholder: 'Enter your name',
    },
    email: {
      type: 'email',
      label: 'Email',
      required: true,
      placeholder: 'Enter your email',
    },
    country: {
      type: 'select',
      label: 'Country',
      required: true,
      options: [
        { label: 'United States', value: 'us' },
        { label: 'Canada', value: 'ca' },
      ],
      placeholder: 'Select country',
    },
    newsletter: {
      type: 'checkbox',
      label: 'Subscribe to newsletter',
    },
  };

  beforeEach(() => {
    mockOnSubmit.mockClear();
  });

  it('renders all form fields correctly', () => {
    render(<UBAutoForm defaultValues={defaultValues} fields={fields} onSubmit={mockOnSubmit} />);

    expect(screen.getByLabelText('Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Country')).toBeInTheDocument();
    expect(screen.getByLabelText('Subscribe to newsletter')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument();
  });

  it('displays custom submit button text', () => {
    render(
      <UBAutoForm
        defaultValues={defaultValues}
        fields={fields}
        onSubmit={mockOnSubmit}
        submitButtonText="Create Account"
      />
    );

    expect(screen.getByRole('button', { name: 'Create Account' })).toBeInTheDocument();
  });

  it('shows validation errors for required fields', async () => {
    const user = userEvent.setup();

    render(<UBAutoForm defaultValues={defaultValues} fields={fields} onSubmit={mockOnSubmit} />);

    const submitButton = screen.getByRole('button', { name: 'Submit' });
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Name is required')).toBeInTheDocument();
    });

    expect(screen.getByText('Email is required')).toBeInTheDocument();
    expect(screen.getByText('Country is required')).toBeInTheDocument();

    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  it('submits form with valid data', async () => {
    const user = userEvent.setup();

    render(<UBAutoForm defaultValues={defaultValues} fields={fields} onSubmit={mockOnSubmit} />);

    // Fill out the form
    await user.type(screen.getByLabelText('Name'), 'John Doe');
    await user.type(screen.getByLabelText('Email'), 'john@example.com');
    await user.selectOptions(screen.getByLabelText('Country'), 'us');
    await user.click(screen.getByLabelText('Subscribe to newsletter'));

    const submitButton = screen.getByRole('button', { name: 'Submit' });
    await user.click(submitButton);

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith({
        name: 'John Doe',
        email: 'john@example.com',
        country: 'us',
        newsletter: true,
      });
    });
  });

  it('disables form when disabled prop is true', () => {
    render(
      <UBAutoForm
        defaultValues={defaultValues}
        fields={fields}
        onSubmit={mockOnSubmit}
        disabled={true}
      />
    );

    expect(screen.getByLabelText('Name')).toBeDisabled();
    expect(screen.getByLabelText('Email')).toBeDisabled();
    expect(screen.getByLabelText('Country')).toBeDisabled();
    expect(screen.getByLabelText('Subscribe to newsletter')).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Submit' })).toBeDisabled();
  });

  it('handles custom field rendering', () => {
    const customFields: FieldsConfig<{ customField: string }> = {
      customField: {
        label: 'Custom Field',
        render: () => <div data-testid="custom-field">Custom Content</div>,
      },
    };

    render(
      <UBAutoForm
        defaultValues={{ customField: '' }}
        fields={customFields}
        onSubmit={mockOnSubmit}
      />
    );

    expect(screen.getByTestId('custom-field')).toBeInTheDocument();
    expect(screen.getByText('Custom Content')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(
      <UBAutoForm
        defaultValues={defaultValues}
        fields={fields}
        onSubmit={mockOnSubmit}
        className="custom-form-class"
      />
    );

    const form = screen.getByRole('form');
    expect(form).toHaveClass('custom-form-class');
  });
});
