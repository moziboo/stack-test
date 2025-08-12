# Component Templates

This directory contains templates for creating new components in the UtilityBelt component library. These templates provide a consistent structure and follow the established patterns used throughout the project.

## Template Structure

The `UBComponent` template includes the following files:

```
UBComponent/
├── index.ts                    # Barrel export
├── UBComponent.tsx            # Main component implementation
├── UBComponent.module.css     # Component-specific styles
├── UBComponent.stories.tsx    # Storybook stories
└── UBComponent.test.tsx       # Unit tests
```

## How to Use the Template

### 1. Copy the Template

Copy the entire `UBComponent` directory and rename it to your new component name:

```bash
cp -r src/templates/UBComponent src/components/UBYourNewComponent
```

### 2. Rename Files

Rename all files to match your component name:

```bash
cd src/components/UBYourNewComponent
mv UBComponent.tsx UBYourNewComponent.tsx
mv UBComponent.module.css UBYourNewComponent.module.css
mv UBComponent.stories.tsx UBYourNewComponent.stories.tsx
mv UBComponent.test.tsx UBYourNewComponent.test.tsx
```

### 3. Update File Contents

#### Component File (`UBYourNewComponent.tsx`)

```typescript
import styles from './UBYourNewComponent.module.css';

interface UBYourNewComponentProps {
  // Define your component props here
  // Example:
  // label?: string;
  // disabled?: boolean;
  // onClick?: () => void;
}

const UBYourNewComponent = (props: UBYourNewComponentProps) => {
  return (
    <div className={styles.container}>
      {/* Your component implementation */}
    </div>
  );
};

export default UBYourNewComponent;
```

#### Index File (`index.ts`)

```typescript
export { default } from './UBYourNewComponent';
```

#### Styles (`UBYourNewComponent.module.css`)

```css
.container {
  /* Add your component styles here */
  /* Follow the design system tokens in src/styles/tokens.css */
}
```

#### Stories (`UBYourNewComponent.stories.tsx`)

```typescript
import type { Meta, StoryObj } from '@storybook/react-vite';
import UBYourNewComponent from './UBYourNewComponent';

const meta: Meta<typeof UBYourNewComponent> = {
  title: 'UtilityBelt/UBYourNewComponent',
  component: UBYourNewComponent,
  parameters: {
    // Optional: Add component-specific parameters
  },
  argTypes: {
    // Define controls for your props
  },
};

export default meta;

type Story = StoryObj<typeof UBYourNewComponent>;

export const Default: Story = {
  args: {
    // Default prop values
  },
};

export const Variant: Story = {
  args: {
    // Additional story variations
  },
};
```

#### Tests (`UBYourNewComponent.test.tsx`)

```typescript
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import UBYourNewComponent from './UBYourNewComponent';

describe('UBYourNewComponent', () => {
  it('renders without crashing', () => {
    render(<UBYourNewComponent />);
  });

  it('displays the correct content', () => {
    render(<UBYourNewComponent />);
    // Add specific assertions based on your component
    // Example: expect(screen.getByRole('button')).toBeInTheDocument();
  });

  // Add more tests as needed
});
```

## Naming Conventions

- **Component Name**: Use PascalCase with "UB" prefix (e.g., `UBButton`, `UBInput`)
- **Files**: Match the component name exactly
- **CSS Classes**: Use camelCase in CSS modules
- **Props Interface**: Component name + "Props" suffix

## Best Practices

### Component Implementation

1. **Use TypeScript interfaces** for prop definitions
2. **Import styles** using CSS modules
3. **Follow accessibility guidelines** (ARIA labels, semantic HTML)
4. **Use React hooks** appropriately (useState, useEffect, etc.)
5. **Implement proper error boundaries** when needed

### Styling

1. **Use CSS Modules** for component-specific styles
2. **Reference design tokens** from `src/styles/tokens.css`
3. **Follow the existing naming conventions** for CSS classes
4. **Ensure responsive design** where applicable

### Testing

1. **Test component rendering** without crashing
2. **Test user interactions** (clicks, form submissions, etc.)
3. **Test different prop combinations**
4. **Test accessibility features**
5. **Mock external dependencies** when necessary

### Storybook Stories

1. **Create a Default story** showing the basic component
2. **Add variant stories** for different states/props
3. **Use meaningful story names** that describe the scenario
4. **Add appropriate controls** for interactive testing
5. **Document usage examples** in the story descriptions

## Integration with Existing Components

After creating your component:

1. **Export it** from `src/components/index.ts` if needed
2. **Update the components README** if it exists
3. **Consider integration** with the existing design system
4. **Test compatibility** with other components

## Design System Integration

The template is designed to work with:

- **Design tokens** in `src/styles/tokens.css`
- **Radix UI primitives** (when applicable)
- **CSS Modules** for styling
- **Storybook** for documentation and testing
- **Vitest** for unit testing

## Examples

Look at existing components for reference:

- `src/components/UBCheckbox/` - Simple form component
- `src/components/UBInput/` - Input component with validation
- `src/components/UBRadioGroup/` - Complex component with multiple variants

## Support

For questions about component development or template usage, refer to the main project documentation or reach out to the development team.