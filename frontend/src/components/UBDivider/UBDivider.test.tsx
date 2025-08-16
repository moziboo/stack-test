import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import UBDivider from './UBDivider';

describe('UBDivider', () => {
  it('renders without crashing', () => {
    const { container } = render(<UBDivider />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('applies correct orientation classes', () => {
    const { rerender } = render(<UBDivider orientation="horizontal" data-testid="divider" />);
    expect(screen.getByTestId('divider')).toHaveClass('horizontal');

    rerender(<UBDivider orientation="vertical" data-testid="divider" />);
    expect(screen.getByTestId('divider')).toHaveClass('vertical');
  });

  it('applies correct variant classes', () => {
    const { rerender, container } = render(<UBDivider variant="solid" />);
    expect(container.querySelector('.solid')).toBeInTheDocument();

    rerender(<UBDivider variant="dashed" />);
    expect(container.querySelector('.dashed')).toBeInTheDocument();

    rerender(<UBDivider variant="dotted" />);
    expect(container.querySelector('.dotted')).toBeInTheDocument();
  });

  it('applies correct spacing classes', () => {
    const { rerender } = render(<UBDivider spacing="sm" data-testid="divider" />);
    expect(screen.getByTestId('divider')).toHaveClass('spacing-sm');

    rerender(<UBDivider spacing="lg" data-testid="divider" />);
    expect(screen.getByTestId('divider')).toHaveClass('spacing-lg');

    rerender(<UBDivider spacing="none" data-testid="divider" />);
    expect(screen.getByTestId('divider')).toHaveClass('spacing-none');
  });

  it('renders with label when provided', () => {
    render(<UBDivider label="Section Break" />);
    expect(screen.getByText('Section Break')).toBeInTheDocument();
  });

  it('applies correct label position classes', () => {
    const { rerender, container } = render(<UBDivider label="Test" labelPosition="left" />);
    expect(container.querySelector('.label-left')).toBeInTheDocument();

    rerender(<UBDivider label="Test" labelPosition="center" />);
    expect(container.querySelector('.label-center')).toBeInTheDocument();

    rerender(<UBDivider label="Test" labelPosition="right" />);
    expect(container.querySelector('.label-right')).toBeInTheDocument();
  });

  it('does not render label for vertical orientation', () => {
    render(<UBDivider orientation="vertical" label="Should not appear" />);
    expect(screen.queryByText('Should not appear')).not.toBeInTheDocument();
  });

  it('has role="separator" when no label is provided', () => {
    render(<UBDivider data-testid="divider" />);
    expect(screen.getByTestId('divider')).toHaveAttribute('role', 'separator');
  });

  it('does not have role="separator" when label is provided', () => {
    render(<UBDivider label="Section" data-testid="divider" />);
    expect(screen.getByTestId('divider')).not.toHaveAttribute('role', 'separator');
  });

  it('applies custom className', () => {
    render(<UBDivider className="custom-divider" data-testid="divider" />);
    expect(screen.getByTestId('divider')).toHaveClass('custom-divider');
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

  it('renders different structure with and without label', () => {
    const { rerender, container } = render(<UBDivider />);

    // Without label should have single divider with 'full' class
    expect(container.querySelector('.full')).toBeInTheDocument();
    expect(container.querySelectorAll('.divider')).toHaveLength(1);

    rerender(<UBDivider label="Test Label" />);

    // With label should have two dividers and a label
    expect(container.querySelector('.full')).not.toBeInTheDocument();
    expect(container.querySelectorAll('.divider')).toHaveLength(2);
    expect(container.querySelector('.label')).toBeInTheDocument();
  });

  it('uses default values when props are not provided', () => {
    render(<UBDivider data-testid="divider" />);
    const divider = screen.getByTestId('divider');

    expect(divider).toHaveClass('horizontal'); // default orientation
    expect(divider).toHaveClass('spacing-md'); // default spacing

    const dividerLine = divider.querySelector('.divider');
    expect(dividerLine).toHaveClass('solid'); // default variant
  });

  it('handles all spacing variants correctly', () => {
    const spacings = ['none', 'sm', 'md', 'lg', 'xl'] as const;

    spacings.forEach(spacing => {
      const { container } = render(<UBDivider spacing={spacing} />);
      expect(container.firstChild).toHaveClass(`spacing-${spacing}`);
    });
  });

  it('handles all variant types correctly', () => {
    const variants = ['solid', 'dashed', 'dotted'] as const;

    variants.forEach(variant => {
      const { container } = render(<UBDivider variant={variant} />);
      expect(container.querySelector('.divider')).toHaveClass(variant);
    });
  });

  it('handles all label positions correctly', () => {
    const positions = ['left', 'center', 'right'] as const;

    positions.forEach(position => {
      const { container } = render(<UBDivider label="Test" labelPosition={position} />);
      expect(container.querySelector('.label')).toHaveClass(`label-${position}`);
    });
  });
});
