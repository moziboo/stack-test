import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import UBTabs from './UBTabs';

describe('UBTabs', () => {
  const defaultTabs = (
    <UBTabs value="tab1">
      <UBTabs.List>
        <UBTabs.Trigger value="tab1">Tab 1</UBTabs.Trigger>
        <UBTabs.Trigger value="tab2">Tab 2</UBTabs.Trigger>
        <UBTabs.Trigger value="tab3">Tab 3</UBTabs.Trigger>
      </UBTabs.List>
      <UBTabs.Content value="tab1">Content 1</UBTabs.Content>
      <UBTabs.Content value="tab2">Content 2</UBTabs.Content>
      <UBTabs.Content value="tab3">Content 3</UBTabs.Content>
    </UBTabs>
  );

  it('renders without crashing', () => {
    render(defaultTabs);
    expect(screen.getByText('Tab 1')).toBeInTheDocument();
    expect(screen.getByText('Content 1')).toBeInTheDocument();
  });

  it('shows the correct active content', () => {
    render(defaultTabs);
    expect(screen.getByText('Content 1')).toBeInTheDocument();
    expect(screen.queryByText('Content 2')).not.toBeInTheDocument();
    expect(screen.queryByText('Content 3')).not.toBeInTheDocument();
  });

  it('switches content when tab is clicked', () => {
    render(defaultTabs);

    fireEvent.click(screen.getByText('Tab 2'));
    expect(screen.getByText('Content 2')).toBeInTheDocument();
    expect(screen.queryByText('Content 1')).not.toBeInTheDocument();
  });

  it('calls onValueChange when tab is switched', () => {
    const mockOnValueChange = vi.fn();
    render(
      <UBTabs value="tab1" onValueChange={mockOnValueChange}>
        <UBTabs.List>
          <UBTabs.Trigger value="tab1">Tab 1</UBTabs.Trigger>
          <UBTabs.Trigger value="tab2">Tab 2</UBTabs.Trigger>
        </UBTabs.List>
        <UBTabs.Content value="tab1">Content 1</UBTabs.Content>
        <UBTabs.Content value="tab2">Content 2</UBTabs.Content>
      </UBTabs>
    );

    fireEvent.click(screen.getByText('Tab 2'));
    expect(mockOnValueChange).toHaveBeenCalledWith('tab2');
  });

  it('applies correct orientation classes', () => {
    const { rerender, container } = render(
      <UBTabs orientation="horizontal" value="tab1">
        <UBTabs.List>
          <UBTabs.Trigger value="tab1">Tab 1</UBTabs.Trigger>
        </UBTabs.List>
        <UBTabs.Content value="tab1">Content 1</UBTabs.Content>
      </UBTabs>
    );

    expect(container.querySelector('.horizontal')).toBeInTheDocument();

    rerender(
      <UBTabs orientation="vertical" value="tab1">
        <UBTabs.List>
          <UBTabs.Trigger value="tab1">Tab 1</UBTabs.Trigger>
        </UBTabs.List>
        <UBTabs.Content value="tab1">Content 1</UBTabs.Content>
      </UBTabs>
    );

    expect(container.querySelector('.vertical')).toBeInTheDocument();
  });

  it('applies correct list variant classes', () => {
    const { rerender, container } = render(
      <UBTabs value="tab1">
        <UBTabs.List variant="default">
          <UBTabs.Trigger value="tab1">Tab 1</UBTabs.Trigger>
        </UBTabs.List>
        <UBTabs.Content value="tab1">Content 1</UBTabs.Content>
      </UBTabs>
    );

    expect(container.querySelector('.list-default')).toBeInTheDocument();

    rerender(
      <UBTabs value="tab1">
        <UBTabs.List variant="pills">
          <UBTabs.Trigger value="tab1">Tab 1</UBTabs.Trigger>
        </UBTabs.List>
        <UBTabs.Content value="tab1">Content 1</UBTabs.Content>
      </UBTabs>
    );

    expect(container.querySelector('.list-pills')).toBeInTheDocument();

    rerender(
      <UBTabs value="tab1">
        <UBTabs.List variant="underline">
          <UBTabs.Trigger value="tab1">Tab 1</UBTabs.Trigger>
        </UBTabs.List>
        <UBTabs.Content value="tab1">Content 1</UBTabs.Content>
      </UBTabs>
    );

    expect(container.querySelector('.list-underline')).toBeInTheDocument();
  });

  it('applies correct list size classes', () => {
    const { rerender, container } = render(
      <UBTabs value="tab1">
        <UBTabs.List size="sm">
          <UBTabs.Trigger value="tab1">Tab 1</UBTabs.Trigger>
        </UBTabs.List>
        <UBTabs.Content value="tab1">Content 1</UBTabs.Content>
      </UBTabs>
    );

    expect(container.querySelector('.list-sm')).toBeInTheDocument();

    rerender(
      <UBTabs value="tab1">
        <UBTabs.List size="lg">
          <UBTabs.Trigger value="tab1">Tab 1</UBTabs.Trigger>
        </UBTabs.List>
        <UBTabs.Content value="tab1">Content 1</UBTabs.Content>
      </UBTabs>
    );

    expect(container.querySelector('.list-lg')).toBeInTheDocument();
  });

  it('handles disabled triggers correctly', () => {
    render(
      <UBTabs value="tab1">
        <UBTabs.List>
          <UBTabs.Trigger value="tab1">Tab 1</UBTabs.Trigger>
          <UBTabs.Trigger value="tab2" disabled>
            Tab 2
          </UBTabs.Trigger>
        </UBTabs.List>
        <UBTabs.Content value="tab1">Content 1</UBTabs.Content>
        <UBTabs.Content value="tab2">Content 2</UBTabs.Content>
      </UBTabs>
    );

    const disabledTrigger = screen.getByText('Tab 2');
    expect(disabledTrigger).toHaveAttribute('disabled');

    fireEvent.click(disabledTrigger);
    // Content should not change
    expect(screen.getByText('Content 1')).toBeInTheDocument();
    expect(screen.queryByText('Content 2')).not.toBeInTheDocument();
  });

  it('supports keyboard navigation', () => {
    render(defaultTabs);

    const firstTrigger = screen.getByText('Tab 1');
    firstTrigger.focus();

    // Arrow right should move to next tab
    fireEvent.keyDown(firstTrigger, { key: 'ArrowRight' });
    expect(screen.getByText('Content 2')).toBeInTheDocument();
  });

  it('forwards refs correctly', () => {
    let rootRef: HTMLElement | null = null;
    let listRef: HTMLDivElement | null = null;
    let triggerRef: HTMLButtonElement | null = null;
    let contentRef: HTMLDivElement | null = null;

    render(
      <UBTabs ref={el => (rootRef = el)} value="tab1">
        <UBTabs.List ref={el => (listRef = el)}>
          <UBTabs.Trigger ref={el => (triggerRef = el)} value="tab1">
            Tab 1
          </UBTabs.Trigger>
        </UBTabs.List>
        <UBTabs.Content ref={el => (contentRef = el)} value="tab1">
          Content 1
        </UBTabs.Content>
      </UBTabs>
    );

    expect(rootRef).toBeInstanceOf(HTMLElement);
    expect(listRef).toBeInstanceOf(HTMLDivElement);
    expect(triggerRef).toBeInstanceOf(HTMLButtonElement);
    expect(contentRef).toBeInstanceOf(HTMLDivElement);
  });

  it('applies custom className correctly', () => {
    render(
      <UBTabs className="custom-tabs" value="tab1">
        <UBTabs.List className="custom-list">
          <UBTabs.Trigger className="custom-trigger" value="tab1">
            Tab 1
          </UBTabs.Trigger>
        </UBTabs.List>
        <UBTabs.Content className="custom-content" value="tab1">
          Content 1
        </UBTabs.Content>
      </UBTabs>
    );

    expect(screen.getByRole('tablist').closest('.custom-tabs')).toBeInTheDocument();
    expect(screen.getByRole('tablist')).toHaveClass('custom-list');
    expect(screen.getByRole('tab')).toHaveClass('custom-trigger');
    expect(screen.getByRole('tabpanel')).toHaveClass('custom-content');
  });

  it('handles manual activation mode', () => {
    const mockOnValueChange = vi.fn();
    render(
      <UBTabs value="tab1" onValueChange={mockOnValueChange} activationMode="manual">
        <UBTabs.List>
          <UBTabs.Trigger value="tab1">Tab 1</UBTabs.Trigger>
          <UBTabs.Trigger value="tab2">Tab 2</UBTabs.Trigger>
        </UBTabs.List>
        <UBTabs.Content value="tab1">Content 1</UBTabs.Content>
        <UBTabs.Content value="tab2">Content 2</UBTabs.Content>
      </UBTabs>
    );

    const secondTrigger = screen.getByText('Tab 2');

    // Focus should not activate in manual mode
    secondTrigger.focus();
    expect(screen.getByText('Content 1')).toBeInTheDocument();
    expect(mockOnValueChange).not.toHaveBeenCalled();

    // Click should still activate
    fireEvent.click(secondTrigger);
    expect(mockOnValueChange).toHaveBeenCalledWith('tab2');
  });
});
