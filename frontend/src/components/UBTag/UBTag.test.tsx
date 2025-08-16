import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import UBTag from './UBTag';

describe('UBTag', () => {
  it('renders without crashing', () => {
    render(<UBTag>Test Tag</UBTag>);
    expect(screen.getByText('Test Tag')).toBeInTheDocument();
  });

  it('applies correct variant classes', () => {
    const { rerender } = render(
      <UBTag variant="primary" data-testid="tag">
        Primary
      </UBTag>
    );
    expect(screen.getByTestId('tag')).toHaveClass('primary');

    rerender(
      <UBTag variant="success" data-testid="tag">
        Success
      </UBTag>
    );
    expect(screen.getByTestId('tag')).toHaveClass('success');

    rerender(
      <UBTag variant="error" data-testid="tag">
        Error
      </UBTag>
    );
    expect(screen.getByTestId('tag')).toHaveClass('error');
  });

  it('applies correct size classes', () => {
    const { rerender } = render(
      <UBTag size="sm" data-testid="tag">
        Small
      </UBTag>
    );
    expect(screen.getByTestId('tag')).toHaveClass('sm');

    rerender(
      <UBTag size="lg" data-testid="tag">
        Large
      </UBTag>
    );
    expect(screen.getByTestId('tag')).toHaveClass('lg');
  });

  it('renders with icon when provided', () => {
    render(<UBTag icon="⭐">Starred</UBTag>);
    expect(screen.getByText('⭐')).toBeInTheDocument();
    expect(screen.getByText('Starred')).toBeInTheDocument();
  });

  it('renders remove button when removable is true', () => {
    const mockOnRemove = vi.fn();
    render(
      <UBTag removable onRemove={mockOnRemove}>
        Removable Tag
      </UBTag>
    );

    const removeButton = screen.getByRole('button', { name: /remove removable tag tag/i });
    expect(removeButton).toBeInTheDocument();
    expect(screen.getByText('×')).toBeInTheDocument();
  });

  it('calls onRemove when remove button is clicked', () => {
    const mockOnRemove = vi.fn();
    render(
      <UBTag removable onRemove={mockOnRemove}>
        Removable Tag
      </UBTag>
    );

    const removeButton = screen.getByRole('button', { name: /remove removable tag tag/i });
    fireEvent.click(removeButton);
    expect(mockOnRemove).toHaveBeenCalledTimes(1);
  });

  it('does not render remove button when removable is false', () => {
    render(<UBTag removable={false}>Non-removable Tag</UBTag>);
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('does not render remove button when onRemove is not provided', () => {
    render(<UBTag removable>No Handler Tag</UBTag>);
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(
      <UBTag className="custom-tag" data-testid="tag">
        Custom
      </UBTag>
    );
    expect(screen.getByTestId('tag')).toHaveClass('custom-tag');
  });

  it('forwards refs correctly', () => {
    let ref: HTMLSpanElement | null = null;
    render(<UBTag ref={el => (ref = el)}>Ref Tag</UBTag>);
    expect(ref).toBeInstanceOf(HTMLSpanElement);
  });

  it('passes through additional props', () => {
    render(
      <UBTag data-testid="custom-tag" id="tag-1">
        Props Tag
      </UBTag>
    );
    const tag = screen.getByTestId('custom-tag');
    expect(tag).toHaveAttribute('id', 'tag-1');
  });

  it('renders content in correct structure', () => {
    const { container } = render(
      <UBTag icon="🏷" removable onRemove={() => {}}>
        Structured Tag
      </UBTag>
    );

    // Check that icon, content, and remove button are all present
    expect(screen.getByText('🏷')).toBeInTheDocument();
    expect(screen.getByText('Structured Tag')).toBeInTheDocument();
    expect(screen.getByText('×')).toBeInTheDocument();

    // Check CSS classes exist
    expect(container.querySelector('.icon')).toBeInTheDocument();
    expect(container.querySelector('.content')).toBeInTheDocument();
    expect(container.querySelector('.removeButton')).toBeInTheDocument();
  });

  it('has correct accessibility attributes on remove button', () => {
    render(
      <UBTag removable onRemove={() => {}}>
        Accessible Tag
      </UBTag>
    );

    const removeButton = screen.getByRole('button');
    expect(removeButton).toHaveAttribute('aria-label', 'Remove Accessible Tag tag');
    expect(removeButton).toHaveAttribute('type', 'button');
  });

  it('renders with default variant and size when not specified', () => {
    render(<UBTag data-testid="tag">Default Tag</UBTag>);
    const tag = screen.getByTestId('tag');
    expect(tag).toHaveClass('default');
    expect(tag).toHaveClass('md');
  });

  it('handles click events on the tag itself', () => {
    const mockClick = vi.fn();
    render(<UBTag onClick={mockClick}>Clickable Tag</UBTag>);

    fireEvent.click(screen.getByText('Clickable Tag'));
    expect(mockClick).toHaveBeenCalledTimes(1);
  });

  it('renders multiple tags correctly', () => {
    render(
      <div>
        <UBTag>First Tag</UBTag>
        <UBTag>Second Tag</UBTag>
        <UBTag>Third Tag</UBTag>
      </div>
    );

    expect(screen.getByText('First Tag')).toBeInTheDocument();
    expect(screen.getByText('Second Tag')).toBeInTheDocument();
    expect(screen.getByText('Third Tag')).toBeInTheDocument();
  });
});
