import type { User, Post, ApiResponse } from '../../types';
import { createMockUser, createMockPost } from '../testUtils';

// Legacy Mock API service for testing
// NOTE: This is now replaced by MSW handlers in ./handlers.ts
// This file is kept for reference and backward compatibility
//
// With MSW, you can now use your actual apiClient and it will be intercepted
// automatically. This provides more realistic testing than direct function mocks.

export const mockApiService = {
  // Mock users endpoint
  getUsers: async (): Promise<ApiResponse<User[]>> => {
    return {
      data: [
        createMockUser({ id: 'user-1', name: 'User One' }),
        createMockUser({ id: 'user-2', name: 'User Two' }),
        createMockUser({ id: 'user-3', name: 'User Three' }),
      ],
      status: 200,
      message: 'Success',
    };
  },

  // Mock posts endpoint
  getPosts: async (): Promise<ApiResponse<Post[]>> => {
    return {
      data: [
        createMockPost({
          id: 'post-1',
          title: 'First Post',
          author: createMockUser({ id: 'user-1', name: 'User One' }),
        }),
        createMockPost({
          id: 'post-2',
          title: 'Second Post',
          author: createMockUser({ id: 'user-2', name: 'User Two' }),
        }),
      ],
      status: 200,
      message: 'Success',
    };
  },

  // Mock error response
  getError: async (): Promise<never> => {
    throw new Error('API Error');
  },
};
