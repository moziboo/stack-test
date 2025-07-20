# React App Structure

This project follows an idiomatic React application structure to promote maintainability, scalability, and separation of concerns.

## Directory Structure

- **`/assets`**: Static assets like images, fonts, and global styles.
- **`/components`**: Reusable UI components that are used across multiple pages.
- **`/pages`**: Components that represent entire pages in the application.
- **`/context`**: React Context providers for global state management.
- **`/hooks`**: Custom React hooks for reusable logic.
- **`/utils`**: Utility functions and helpers.
- **`/api`**: API clients and service functions.
- **`/types`**: TypeScript type definitions.

## Key Files

- **`App.tsx`**: The root component that sets up the application structure.
- **`main.tsx`**: The entry point that renders the App component.
- **`index.css`**: Global styles.

## Best Practices

1. **Component Structure**: Each component should have a single responsibility.
2. **State Management**: Use React Context for global state and component state for local state.
3. **TypeScript**: Use TypeScript types to ensure type safety.
4. **CSS Modules**: Use CSS Modules for component-specific styles to avoid global namespace pollution.
5. **Custom Hooks**: Extract reusable logic into custom hooks.
6. **API Layer**: Keep API calls separate from UI components.

## Getting Started

To start the development server:

```bash
npm run dev
```

To run tests:

```bash
npm run test
```

To build for production:

```bash
npm run build
``` 