import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import UBSpinner from './UBSpinner';

describe('UBSpinner', () => {
  it('renders without crashing', () => {
    render(<UBSpinner />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('applies correct size classes', () => {
    const { rerender, container } = render(<UBSpinner size="sm" />);
    expect(container.querySelector('.sm')).toBeInTheDocument();

    rerender(<UBSpinner size="lg" />);
    expect(container.querySelector('.lg')).toBeInTheDocument();

    rerender(<UBSpinner size="xl" />);
    expect(container.querySelector('.xl')).toBeInTheDocument();
  });

  it('applies correct variant classes', () => {
    const { rerender, container } = render(<UBSpinner variant="primary" />);
    expect(container.querySelector('.primary')).toBeInTheDocument();

    rerender(<UBSpinner variant="secondary" />);
    expect(container.querySelector('.secondary')).toBeInTheDocument();

    rerender(<UBSpinner variant="default" />);
    expect(container.querySelector('.default')).toBeInTheDocument();
  });

  it('applies correct speed classes', () => {
    const { rerender, container } = render(<UBSpinner speed="fast" />);
    expect(container.querySelector('.fast')).toBeInTheDocument();

    rerender(<UBSpinner speed="slow" />);
    expect(container.querySelector('.slow')).toBeInTheDocument();

    rerender(<UBSpinner speed="normal" />);
    expect(container.querySelector('.normal')).toBeInTheDocument();
  });

  it('shows label when showLabel is true', () => {
    render(<UBSpinner showLabel label="Custom loading text" />);
    expect(screen.getByText('Custom loading text')).toBeInTheDocument();
  });

  it('hides label when showLabel is false', () => {
    render(<UBSpinner showLabel={false} label="Custom loading text" />);
    expect(screen.queryByText('Custom loading text')).not.toBeInTheDocument();
  });

  it('always provides screen reader text', () => {
    render(<UBSpinner label="Loading data" />);
    // Screen reader text should be present but visually hidden
    expect(screen.getByText('Loading data')).toBeInTheDocument();
  });

  it('uses default label when none provided', () => {
    render(<UBSpinner />);
    expect(screen.getByLabelText('Loading...')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<UBSpinner className="custom-spinner" data-testid="spinner" />);
    expect(screen.getByTestId('spinner')).toHaveClass('custom-spinner');
  });

  it('forwards refs correctly', () => {
    let ref: HTMLDivElement | null = null;
    render(<UBSpinner ref={el => (ref = el)} />);
    expect(ref).toBeInstanceOf(HTMLDivElement);
  });

  it('has correct accessibility attributes', () => {
    render(<UBSpinner label="Processing request" />);
    const spinner = screen.getByRole('status');
    expect(spinner).toHaveAttribute('aria-label', 'Processing request');
  });

  it('has aria-hidden on the visual spinner element', () => {
    const { container } = render(<UBSpinner />);
    const visualSpinner = container.querySelector('.spinner');
    expect(visualSpinner).toHaveAttribute('aria-hidden', 'true');
  });

  it('applies correct label size classes when showLabel is true', () => {
    const { rerender, container } = render(<UBSpinner size="sm" showLabel />);
    expect(container.querySelector('.smLabel')).toBeInTheDocument();

    rerender(<UBSpinner size="xl" showLabel />);
    expect(container.querySelector('.xlLabel')).toBeInTheDocument();
  });

  it('passes through additional props', () => {
    render(<UBSpinner data-testid="custom-spinner" id="spinner-1" />);
    const spinner = screen.getByTestId('custom-spinner');
    expect(spinner).toHaveAttribute('id', 'spinner-1');
  });
});
