import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import UBDivider from './UBDivider';

describe('UBDivider', () => {
  it('renders without crashing', () => {
    render(<UBDivider />);
    expect(screen.getByRole('separator')).toBeInTheDocument();
  });

  it('applies correct orientation classes', () => {
    const { rerender } = render(<UBDivider orientation="horizontal" />);
    let separator = screen.getByRole('separator');
    expect(separator.className).toMatch(/horizontal/);

    rerender(<UBDivider orientation="vertical" />);
    separator = screen.getByRole('separator');
    expect(separator.className).toMatch(/vertical/);
  });

  it('applies correct variant classes', () => {
    const { rerender } = render(<UBDivider variant="solid" />);
    let presentation = screen.getByRole('presentation');
    expect(presentation.className).toMatch(/solid/);

    rerender(<UBDivider variant="dashed" />);
    presentation = screen.getByRole('presentation');
    expect(presentation.className).toMatch(/dashed/);

    rerender(<UBDivider variant="dotted" />);
    presentation = screen.getByRole('presentation');
    expect(presentation.className).toMatch(/dotted/);
  });

  it('applies correct spacing classes', () => {
    const { rerender } = render(<UBDivider spacing="sm" />);
    let separator = screen.getByRole('separator');
    expect(separator.className).toMatch(/spacing-sm/);

    rerender(<UBDivider spacing="lg" />);
    separator = screen.getByRole('separator');
    expect(separator.className).toMatch(/spacing-lg/);

    rerender(<UBDivider spacing="none" />);
    separator = screen.getByRole('separator');
    expect(separator.className).toMatch(/spacing-none/);
  });

  it('applies custom className', () => {
    render(<UBDivider className="custom-divider" />);
    expect(screen.getByRole('separator')).toHaveClass('custom-divider');
  });

  it('forwards refs correctly', () => {
    let ref: HTMLDivElement | null = null;
    render(<UBDivider ref={el => (ref = el)} />);
    expect(ref).toBeInstanceOf(HTMLDivElement);
  });

  it('passes through additional props', () => {
    render(<UBDivider data-testid="custom-divider" id="divider-1" />);
    const divider = screen.getByTestId('custom-divider');
    expect(divider).toHaveAttribute('id', 'divider-1');
  });

  it('uses default values when props are not provided', () => {
    render(<UBDivider />);
    const separator = screen.getByRole('separator');
    expect(separator.className).toMatch(/horizontal/); // default orientation
    expect(separator.className).toMatch(/spacing-md/); // default spacing

    expect(screen.getByRole('presentation').className).toMatch(/solid/); // default variant
  });
});
