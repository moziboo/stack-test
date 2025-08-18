import { http, HttpResponse, delay } from 'msw';
import type { User, ApiResponse } from '../../types';
import { createMockUser } from '../testUtils';

// Mock data - you can expand this as needed
const mockUsers: User[] = [
  createMockUser({ id: 'user-1', name: 'Alice Johnson', email: 'alice@example.com' }),
  createMockUser({ id: 'user-2', name: 'Bob Smith', email: 'bob@example.com' }),
  createMockUser({ id: 'user-3', name: 'Charlie Brown', email: 'charlie@example.com' }),
  // Add edge cases for component development
  createMockUser({
    id: 'user-4',
    name: 'Very Long Name That Tests UI Overflow',
    email: 'long@example.com',
  }),
  createMockUser({ id: 'user-5', name: 'X', email: 'short@example.com' }), // Short name
  createMockUser({
    id: 'user-6',
    name: 'Test User With No Avatar',
    email: 'no-avatar@example.com',
    avatar: undefined,
  }),
];

// API handlers that match your API client expectations
export const handlers = [
  // Get all users
  http.get('https://api.example.com/users', async () => {
    const response: ApiResponse<User[]> = {
      data: mockUsers,
      status: 200,
      message: 'Users retrieved successfully',
    };

    await delay(1000);
    return HttpResponse.json(response);
  }),

  // Get user by ID
  http.get('https://api.example.com/users/:id', ({ params }) => {
    const { id } = params;
    const user = mockUsers.find(u => u.id === id);

    if (!user) {
      return HttpResponse.json(
        { data: null, status: 404, message: 'User not found' },
        { status: 404 }
      );
    }

    const response: ApiResponse<User> = {
      data: user,
      status: 200,
      message: 'User retrieved successfully',
    };
    return HttpResponse.json(response);
  }),
];
