# UtilityBelt Component Boilerplate

This boilerplate follows the established patterns in your codebase. Replace `UBComponent` with your actual component name (e.g., `UBButton`, `UBSelect`, etc.).

## File Structure
```
src/components/UBComponent/
├── index.ts                    # Barrel export
├── UBComponent.tsx             # Main component
├── UBComponent.module.css      # Component styles
├── UBComponent.stories.tsx     # Storybook stories
└── UBComponent.test.tsx        # Vitest tests
```

## 1. Component File: `UBComponent.tsx`

```tsx
import { useId, forwardRef } from 'react';
import { Label } from 'radix-ui';
import styles from './UBComponent.module.css';

interface UBComponentProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string;
  disabled?: boolean;
  // Add your specific props here
}

const UBComponent = forwardRef<HTMLDivElement, UBComponentProps>(
  (
    {
      label,
      id,
      disabled = false,
      className,
      children,
      ...restProps
    },
    ref
  ) => {
    const generatedId = useId();
    const componentId = id || generatedId;

    // If no label is provided, just render the component (for use with Radix Form)
    if (!label) {
      return (
        <div
          ref={ref}
          id={componentId}
          className={`${styles.component} ${disabled ? styles.disabled : ''} ${className || ''}`}
          {...restProps}
        >
          {children}
        </div>
      );
    }

    // If label is provided, render with wrapper and label
    return (
      <div className={styles.componentWrapper}>
        <Label.Root
          className={`${styles.label} ${disabled ? styles.disabled : ''}`}
          htmlFor={componentId}
        >
          {label}
        </Label.Root>
        <div
          ref={ref}
          id={componentId}
          className={`${styles.component} ${disabled ? styles.disabled : ''} ${className || ''}`}
          {...restProps}
        >
          {children}
        </div>
      </div>
    );
  }
);

UBComponent.displayName = 'UBComponent';

export default UBComponent;
```

## 2. Styles: `UBComponent.module.css`

```css
/* Component Wrapper */
.componentWrapper {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

/* Label Styles */
.label {
  color: var(--color-text-primary);
  font-size: var(--font-size-md);
  line-height: var(--line-height-base);
  font-weight: 400;
  cursor: pointer;
}

.label.disabled {
  color: var(--color-disabled-text);
  cursor: not-allowed;
}

/* Component Styles */
.component {
  /* Add your component-specific styles here */
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius-md);
  padding: var(--spacing-md);
  background-color: var(--color-background);
  color: var(--color-text-primary);
  transition: all 0.2s ease;
}

.component:hover:not(.disabled) {
  border-color: var(--color-border-hover);
}

.component:focus-visible {
  outline: 2px solid var(--color-focus);
  outline-offset: 2px;
}

.component.disabled {
  background-color: var(--color-disabled-background);
  color: var(--color-disabled-text);
  border-color: var(--color-disabled-border);
  cursor: not-allowed;
}
```

## 3. Stories: `UBComponent.stories.tsx`

```tsx
import type { Meta, StoryObj } from '@storybook/react-vite';
import UBComponent from './UBComponent';
import type { ComponentProps } from 'react';
import { fn } from 'storybook/test';

type UBComponentProps = ComponentProps<typeof UBComponent>;

const meta: Meta<UBComponentProps> = {
  title: 'UtilityBelt/UBComponent',
  component: UBComponent,
  argTypes: {
    label: { control: 'text' },
    disabled: { control: 'boolean' },
    // Add your specific prop controls here
  },
  args: {
    label: 'Component Label',
    disabled: false,
    children: 'Component content goes here',
    // Add your default props here
  },
};

export default meta;

type Story = StoryObj<UBComponentProps>;

export const Default: Story = {
  render: args => <UBComponent {...args} />,
};

export const WithoutLabel: Story = {
  args: {
    label: undefined,
  },
  render: args => <UBComponent {...args} />,
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
  render: args => <UBComponent {...args} />,
};

export const WithoutLabelForRadixForm: Story = {
  args: {
    label: undefined,
  },
  parameters: {
    docs: {
      description: {
        story:
          'This version renders just the component element, perfect for use with Radix Form.Control asChild.',
      },
    },
  },
  render: args => <UBComponent {...args} />,
};
```

## 4. Tests: `UBComponent.test.tsx`

```tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import UBComponent from './UBComponent';

describe('UBComponent', () => {
  it('renders component with label', () => {
    render(<UBComponent label="Test Label">Content</UBComponent>);

    expect(screen.getByText('Content')).toBeInTheDocument();
    expect(screen.getByLabelText('Test Label')).toBeInTheDocument();
  });

  it('renders component without label', () => {
    render(<UBComponent>Content</UBComponent>);

    expect(screen.getByText('Content')).toBeInTheDocument();
    expect(screen.queryByRole('label')).not.toBeInTheDocument();
  });

  it('applies disabled styles when disabled', () => {
    render(<UBComponent disabled label="Test">Content</UBComponent>);

    const component = screen.getByText('Content');
    expect(component).toHaveClass('disabled');
  });

  it('forwards ref correctly', () => {
    const ref = vi.fn();
    render(<UBComponent ref={ref}>Content</UBComponent>);

    expect(ref).toHaveBeenCalledWith(expect.any(HTMLDivElement));
  });

  it('applies custom className', () => {
    render(<UBComponent className="custom-class">Content</UBComponent>);

    const component = screen.getByText('Content');
    expect(component).toHaveClass('custom-class');
  });

  it('generates unique id when not provided', () => {
    render(<UBComponent label="Test">Content</UBComponent>);

    const component = screen.getByText('Content');
    expect(component).toHaveAttribute('id');
  });

  it('uses provided id when given', () => {
    render(<UBComponent id="custom-id" label="Test">Content</UBComponent>);

    const component = screen.getByText('Content');
    expect(component).toHaveAttribute('id', 'custom-id');
  });
});
```

## 5. Index: `index.ts`

```tsx
import UBComponent from './UBComponent.tsx';

export default UBComponent;
```

## Key Patterns in Your Codebase

1. **Conditional label rendering** - Components work both standalone and with Radix Form
2. **forwardRef usage** - All components forward refs properly
3. **CSS Modules** - Scoped styling with design tokens
4. **TypeScript** - Strong typing with proper interfaces
5. **Storybook integration** - Comprehensive stories with controls
6. **Vitest testing** - Thorough test coverage
7. **Radix UI integration** - Uses Radix primitives where appropriate

## Customization Notes

- Replace `HTMLDivElement` with the appropriate HTML element type
- Adjust the interface to extend the correct HTML attributes
- Modify CSS classes and styles for your specific component
- Add component-specific props and their corresponding argTypes
- Update test cases to match your component's behavior
- Consider which Radix UI primitives you might need to import