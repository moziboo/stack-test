# React Testing Setup

This project uses a minimal testing setup with Vitest and React Testing Library.

## Key Components

- **Vitest**: Fast test runner compatible with Vite
- **React Testing Library**: Testing utilities for React components
- **@testing-library/user-event**: Simulates user interactions
- **@testing-library/jest-dom**: Custom DOM element matchers

## Test Directory Structure

While component tests are co-located with their components, the `test` directory contains:

- **`setup.ts`**: Global test setup (imports jest-dom)
- **`testUtils.tsx`**: Reusable testing utilities
- **`mocks/`**: Mock components and services
  - `MockNavigation.tsx`: Simplified navigation component for testing
  - `mockApiService.ts`: Mock API service to avoid real API calls
- **`fixtures/`**: Test data
  - `testData.ts`: Sample data for tests

## Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run specific test file(s)
npm test -- src/components/MyComponent.test.tsx

# Run specific test file(s) in watch mode
npm run test:watch -- src/components/MyComponent.test.tsx
```

## Test File Structure

Component tests are co-located with the files they test, using the `.test.tsx` or `.test.ts` extension.

## Writing Tests

### Component Tests

```tsx
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import MyComponent from './MyComponent'

describe('MyComponent', () => {
  it('renders correctly', () => {
    render(<MyComponent />)
    expect(screen.getByText('My Component')).toBeInTheDocument()
  })
})
```

### Using Test Utilities

```tsx
import { renderWithProviders } from '../test/testUtils'
import { describe, it, expect } from 'vitest'
import MyComponent from './MyComponent'

describe('MyComponent with context', () => {
  it('renders with theme context', () => {
    renderWithProviders(<MyComponent />)
    // Now the component has access to the AppContext
  })
})
```

### Using Mock Data

```tsx
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { createMockUser } from '../test/testUtils'
import UserProfile from './UserProfile'

describe('UserProfile', () => {
  it('displays user information', () => {
    const mockUser = createMockUser({ name: 'Test Name' })
    render(<UserProfile user={mockUser} />)
    expect(screen.getByText('Test Name')).toBeInTheDocument()
  })
})
```

## Best Practices

1. Test behavior, not implementation
2. Use screen queries that match how users find elements
3. Prefer user-event over fireEvent for simulating user interactions
4. Write accessible tests (they help ensure your app is accessible)
5. Keep tests simple and focused 