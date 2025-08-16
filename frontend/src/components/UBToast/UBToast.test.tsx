import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import UBToast from './UBToast';

const ToastWrapper = ({ children }: { children: React.ReactNode }) => (
  <UBToast.Provider>{children}</UBToast.Provider>
);

describe('UBToast', () => {
  it('renders without crashing', () => {
    render(
      <ToastWrapper>
        <UBToast open={true}>
          <UBToast.Content>
            <UBToast.Title>Test Toast</UBToast.Title>
          </UBToast.Content>
        </UBToast>
      </ToastWrapper>
    );

    expect(screen.getByText('Test Toast')).toBeInTheDocument();
  });

  it('renders with title and description', () => {
    render(
      <ToastWrapper>
        <UBToast open={true}>
          <UBToast.Content>
            <UBToast.Title>Test Title</UBToast.Title>
            <UBToast.Description>Test Description</UBToast.Description>
          </UBToast.Content>
        </UBToast>
      </ToastWrapper>
    );

    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
  });

  it('applies correct variant classes', () => {
    const { rerender } = render(
      <ToastWrapper>
        <UBToast open={true}>
          <UBToast.Content variant="success" data-testid="content">
            <UBToast.Title>Success</UBToast.Title>
          </UBToast.Content>
        </UBToast>
      </ToastWrapper>
    );

    expect(screen.getByTestId('content')).toHaveClass('success');

    rerender(
      <ToastWrapper>
        <UBToast open={true}>
          <UBToast.Content variant="error" data-testid="content">
            <UBToast.Title>Error</UBToast.Title>
          </UBToast.Content>
        </UBToast>
      </ToastWrapper>
    );

    expect(screen.getByTestId('content')).toHaveClass('error');
  });

  it('shows and hides icons correctly', () => {
    const { rerender } = render(
      <ToastWrapper>
        <UBToast open={true}>
          <UBToast.Content variant="success" showIcon={true}>
            <UBToast.Title>Success</UBToast.Title>
          </UBToast.Content>
        </UBToast>
      </ToastWrapper>
    );

    expect(screen.getByText('✅')).toBeInTheDocument();

    rerender(
      <ToastWrapper>
        <UBToast open={true}>
          <UBToast.Content variant="success" showIcon={false}>
            <UBToast.Title>Success</UBToast.Title>
          </UBToast.Content>
        </UBToast>
      </ToastWrapper>
    );

    expect(screen.queryByText('✅')).not.toBeInTheDocument();
  });

  it('renders action button correctly', () => {
    const mockAction = vi.fn();

    render(
      <ToastWrapper>
        <UBToast open={true}>
          <UBToast.Content>
            <UBToast.Title>Test</UBToast.Title>
          </UBToast.Content>
          <UBToast.Action altText="Undo action" onClick={mockAction}>
            Undo
          </UBToast.Action>
        </UBToast>
      </ToastWrapper>
    );

    const actionButton = screen.getByText('Undo');
    expect(actionButton).toBeInTheDocument();

    fireEvent.click(actionButton);
    expect(mockAction).toHaveBeenCalledTimes(1);
  });

  it('renders close button and handles close', () => {
    const mockClose = vi.fn();

    render(
      <ToastWrapper>
        <UBToast open={true} onOpenChange={mockClose}>
          <UBToast.Content>
            <UBToast.Title>Test</UBToast.Title>
          </UBToast.Content>
          <UBToast.Close />
        </UBToast>
      </ToastWrapper>
    );

    const closeButton = screen.getByRole('button', { name: /close notification/i });
    expect(closeButton).toBeInTheDocument();

    fireEvent.click(closeButton);
    expect(mockClose).toHaveBeenCalledWith(false);
  });

  it('does not render when open is false', () => {
    render(
      <ToastWrapper>
        <UBToast open={false}>
          <UBToast.Content>
            <UBToast.Title>Hidden Toast</UBToast.Title>
          </UBToast.Content>
        </UBToast>
      </ToastWrapper>
    );

    expect(screen.queryByText('Hidden Toast')).not.toBeInTheDocument();
  });

  it('forwards refs correctly', () => {
    let rootRef: HTMLElement | null = null;
    let contentRef: HTMLDivElement | null = null;
    let titleRef: HTMLDivElement | null = null;

    render(
      <ToastWrapper>
        <UBToast ref={el => (rootRef = el)} open={true}>
          <UBToast.Content ref={el => (contentRef = el)}>
            <UBToast.Title ref={el => (titleRef = el)}>Title</UBToast.Title>
          </UBToast.Content>
        </UBToast>
      </ToastWrapper>
    );

    expect(rootRef).toBeInstanceOf(HTMLElement);
    expect(contentRef).toBeInstanceOf(HTMLDivElement);
    expect(titleRef).toBeInstanceOf(HTMLDivElement);
  });

  it('auto-closes after duration', async () => {
    const mockClose = vi.fn();

    render(
      <ToastWrapper>
        <UBToast open={true} onOpenChange={mockClose} duration={100}>
          <UBToast.Content>
            <UBToast.Title>Auto-close Toast</UBToast.Title>
          </UBToast.Content>
        </UBToast>
      </ToastWrapper>
    );

    await waitFor(
      () => {
        expect(mockClose).toHaveBeenCalledWith(false);
      },
      { timeout: 200 }
    );
  });
});
