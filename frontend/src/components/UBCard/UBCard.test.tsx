import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import UBCard from './UBCard';

describe('UBCard', () => {
  it('renders without crashing', () => {
    render(
      <UBCard>
        <UBCard.Body>Test content</UBCard.Body>
      </UBCard>
    );
    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  it('applies correct variant classes', () => {
    const { rerender } = render(
      <UBCard variant="default" data-testid="card">
        <UBCard.Body>Content</UBCard.Body>
      </UBCard>
    );
    expect(screen.getByTestId('card')).toHaveClass('default');

    rerender(
      <UBCard variant="outlined" data-testid="card">
        <UBCard.Body>Content</UBCard.Body>
      </UBCard>
    );
    expect(screen.getByTestId('card')).toHaveClass('outlined');

    rerender(
      <UBCard variant="elevated" data-testid="card">
        <UBCard.Body>Content</UBCard.Body>
      </UBCard>
    );
    expect(screen.getByTestId('card')).toHaveClass('elevated');
  });

  it('applies correct padding classes', () => {
    const { rerender } = render(
      <UBCard padding="sm" data-testid="card">
        <UBCard.Body>Content</UBCard.Body>
      </UBCard>
    );
    expect(screen.getByTestId('card')).toHaveClass('padding-sm');

    rerender(
      <UBCard padding="lg" data-testid="card">
        <UBCard.Body>Content</UBCard.Body>
      </UBCard>
    );
    expect(screen.getByTestId('card')).toHaveClass('padding-lg');
  });

  it('renders header with divider', () => {
    render(
      <UBCard>
        <UBCard.Header divider data-testid="header">
          Header Content
        </UBCard.Header>
        <UBCard.Body>Body Content</UBCard.Body>
      </UBCard>
    );

    expect(screen.getByTestId('header')).toHaveClass('headerDivider');
    expect(screen.getByText('Header Content')).toBeInTheDocument();
  });

  it('renders footer with divider and correct justification', () => {
    render(
      <UBCard>
        <UBCard.Body>Body Content</UBCard.Body>
        <UBCard.Footer divider justify="between" data-testid="footer">
          Footer Content
        </UBCard.Footer>
      </UBCard>
    );

    const footer = screen.getByTestId('footer');
    expect(footer).toHaveClass('footerDivider');
    expect(footer).toHaveClass('justify-between');
    expect(screen.getByText('Footer Content')).toBeInTheDocument();
  });

  it('forwards refs correctly', () => {
    let cardRef: HTMLDivElement | null = null;
    let headerRef: HTMLDivElement | null = null;
    let bodyRef: HTMLDivElement | null = null;
    let footerRef: HTMLDivElement | null = null;

    render(
      <UBCard ref={el => (cardRef = el)}>
        <UBCard.Header ref={el => (headerRef = el)}>Header</UBCard.Header>
        <UBCard.Body ref={el => (bodyRef = el)}>Body</UBCard.Body>
        <UBCard.Footer ref={el => (footerRef = el)}>Footer</UBCard.Footer>
      </UBCard>
    );

    expect(cardRef).toBeInstanceOf(HTMLDivElement);
    expect(headerRef).toBeInstanceOf(HTMLDivElement);
    expect(bodyRef).toBeInstanceOf(HTMLDivElement);
    expect(footerRef).toBeInstanceOf(HTMLDivElement);
  });
});
