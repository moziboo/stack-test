import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import UBAlert from './UBAlert';

describe('UBAlert', () => {
  it('renders alert with default variant', () => {
    render(<UBAlert>Test message</UBAlert>);

    const alert = screen.getByRole('alert');
    expect(alert).toBeInTheDocument();
    expect(alert).toHaveClass('info');
    expect(screen.getByText('Test message')).toBeInTheDocument();
  });

  it('renders alert with title', () => {
    render(<UBAlert title="Test Title">Test message</UBAlert>);

    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test message')).toBeInTheDocument();
  });

  it('renders alert without title', () => {
    render(<UBAlert>Test message</UBAlert>);

    expect(screen.getByText('Test message')).toBeInTheDocument();
    expect(screen.queryByRole('heading')).not.toBeInTheDocument();
  });

  it('applies correct variant class', () => {
    const { rerender } = render(<UBAlert variant="success">Success message</UBAlert>);
    expect(screen.getByRole('alert')).toHaveClass('success');

    rerender(<UBAlert variant="warning">Warning message</UBAlert>);
    expect(screen.getByRole('alert')).toHaveClass('warning');

    rerender(<UBAlert variant="error">Error message</UBAlert>);
    expect(screen.getByRole('alert')).toHaveClass('error');
  });

  it('shows default icon for each variant', () => {
    const { rerender } = render(<UBAlert variant="info">Info</UBAlert>);
    expect(screen.getByText('ℹ️')).toBeInTheDocument();

    rerender(<UBAlert variant="success">Success</UBAlert>);
    expect(screen.getByText('✅')).toBeInTheDocument();

    rerender(<UBAlert variant="warning">Warning</UBAlert>);
    expect(screen.getByText('⚠️')).toBeInTheDocument();

    rerender(<UBAlert variant="error">Error</UBAlert>);
    expect(screen.getByText('❌')).toBeInTheDocument();
  });

  it('renders custom icon when provided', () => {
    render(<UBAlert icon={<span data-testid="custom-icon">🔔</span>}>Custom icon alert</UBAlert>);

    expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
    expect(screen.queryByText('ℹ️')).not.toBeInTheDocument();
  });

  it('renders no icon when icon is null', () => {
    render(<UBAlert icon={null}>No icon alert</UBAlert>);

    expect(screen.queryByText('ℹ️')).not.toBeInTheDocument();
    expect(screen.getByText('No icon alert')).toBeInTheDocument();
  });

  it('shows dismiss button when dismissible', () => {
    render(
      <UBAlert dismissible onDismiss={vi.fn()}>
        Dismissible alert
      </UBAlert>
    );

    expect(screen.getByLabelText('Dismiss alert')).toBeInTheDocument();
    expect(screen.getByText('×')).toBeInTheDocument();
  });

  it('does not show dismiss button when not dismissible', () => {
    render(<UBAlert>Non-dismissible alert</UBAlert>);

    expect(screen.queryByLabelText('Dismiss alert')).not.toBeInTheDocument();
  });

  it('calls onDismiss when dismiss button is clicked', async () => {
    const user = userEvent.setup();
    const handleDismiss = vi.fn();

    render(
      <UBAlert dismissible onDismiss={handleDismiss}>
        Dismissible alert
      </UBAlert>
    );

    const dismissButton = screen.getByLabelText('Dismiss alert');
    await user.click(dismissButton);

    expect(handleDismiss).toHaveBeenCalledTimes(1);
  });

  it('forwards ref correctly', () => {
    const ref = vi.fn();
    render(<UBAlert ref={ref}>Test alert</UBAlert>);

    expect(ref).toHaveBeenCalledWith(expect.any(HTMLDivElement));
  });

  it('applies custom className', () => {
    render(<UBAlert className="custom-class">Test alert</UBAlert>);

    const alert = screen.getByRole('alert');
    expect(alert).toHaveClass('custom-class');
  });

  it('supports additional HTML attributes', () => {
    render(
      <UBAlert data-testid="test-alert" id="alert-1">
        Test alert
      </UBAlert>
    );

    const alert = screen.getByTestId('test-alert');
    expect(alert).toHaveAttribute('id', 'alert-1');
  });

  it('renders title only without message', () => {
    render(<UBAlert title="Title Only" />);

    expect(screen.getByText('Title Only')).toBeInTheDocument();
    // Should not render empty message container
    const alert = screen.getByRole('alert');
    expect(alert.querySelector('.message')).not.toBeInTheDocument();
  });

  it('handles complex content', () => {
    render(
      <UBAlert title="Complex Content">
        <div>
          <p>Paragraph 1</p>
          <p>Paragraph 2</p>
          <ul>
            <li>Item 1</li>
            <li>Item 2</li>
          </ul>
        </div>
      </UBAlert>
    );

    expect(screen.getByText('Complex Content')).toBeInTheDocument();
    expect(screen.getByText('Paragraph 1')).toBeInTheDocument();
    expect(screen.getByText('Item 1')).toBeInTheDocument();
  });

  it('maintains accessibility with role alert', () => {
    render(<UBAlert>Accessible alert</UBAlert>);

    const alert = screen.getByRole('alert');
    expect(alert).toBeInTheDocument();
  });

  it('dismiss button has proper accessibility attributes', () => {
    render(
      <UBAlert dismissible onDismiss={vi.fn()}>
        Dismissible alert
      </UBAlert>
    );

    const dismissButton = screen.getByLabelText('Dismiss alert');
    expect(dismissButton).toHaveAttribute('type', 'button');
    expect(dismissButton).toHaveAttribute('aria-label', 'Dismiss alert');
  });
});
