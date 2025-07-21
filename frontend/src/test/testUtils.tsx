import type { ReactElement } from 'react';
import { render } from '@testing-library/react';
import type { RenderOptions } from '@testing-library/react';
import { AppProvider } from '../context/AppContext';

// Custom renderer that includes providers
export function renderWithProviders(ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) {
  return render(ui, {
    wrapper: ({ children }) => <AppProvider>{children}</AppProvider>,
    ...options,
  });
}

// Mock data generators
export const createMockUser = (overrides = {}) => ({
  id: 'user-1',
  name: 'Test User',
  email: 'test@example.com',
  ...overrides,
});

export const createMockPost = (overrides = {}) => ({
  id: 'post-1',
  title: 'Test Post',
  content: 'This is a test post content',
  createdAt: '2023-01-01T00:00:00Z',
  author: createMockUser(),
  ...overrides,
});
