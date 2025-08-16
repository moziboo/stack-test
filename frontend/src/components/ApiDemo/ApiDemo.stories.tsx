import type { Meta, StoryObj } from '@storybook/react-vite';
import { http, HttpResponse } from 'msw';
import { ApiDemo } from './ApiDemo';
import type { User, Post, ApiResponse } from '../../types';

const meta: Meta<typeof ApiDemo> = {
  title: 'Test/ApiDemo',
  component: ApiDemo,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof ApiDemo>;

// Mock data for stories
const mockUsers: User[] = [
  { id: 'user-1', name: 'Alice Johnson', email: 'alice@example.com' },
  { id: 'user-2', name: 'Bob Smith', email: 'bob@example.com' },
  { id: 'user-3', name: 'Charlie Brown', email: 'charlie@example.com' },
];

const mockPosts: Post[] = [
  {
    id: 'post-1',
    title: 'Getting Started with React',
    content: 'React is a powerful library for building user interfaces...',
    createdAt: '2023-01-01T00:00:00Z',
    author: mockUsers[0],
  },
  {
    id: 'post-2',
    title: 'Understanding TypeScript',
    content: 'TypeScript adds static typing to JavaScript...',
    createdAt: '2023-01-02T00:00:00Z',
    author: mockUsers[1],
  },
];

// Default story with successful API responses
export const Default: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get('https://api.example.com/users', () => {
          const response: ApiResponse<User[]> = {
            data: mockUsers,
            status: 200,
            message: 'Users retrieved successfully',
          };
          return HttpResponse.json(response);
        }),
        http.get('https://api.example.com/posts', () => {
          const response: ApiResponse<Post[]> = {
            data: mockPosts,
            status: 200,
            message: 'Posts retrieved successfully',
          };
          return HttpResponse.json(response);
        }),
        http.get('https://api.example.com/users/empty', () => {
          const response: ApiResponse<User[]> = {
            data: [],
            status: 200,
            message: 'No users found',
          };
          return HttpResponse.json(response);
        }),
        http.get('https://api.example.com/error', () => {
          return HttpResponse.json(
            { data: null, status: 500, message: 'Internal server error' },
            { status: 500 }
          );
        }),
        http.get('https://api.example.com/slow', async () => {
          await new Promise(resolve => setTimeout(resolve, 2000));
          const response: ApiResponse<string> = {
            data: 'This response was delayed by 2 seconds',
            status: 200,
            message: 'Slow response completed',
          };
          return HttpResponse.json(response);
        }),
        http.get('https://api.example.com/users/paginated', ({ request }) => {
          const url = new URL(request.url);
          const page = parseInt(url.searchParams.get('page') || '1');
          const limit = parseInt(url.searchParams.get('limit') || '10');

          const start = (page - 1) * limit;
          const end = start + limit;
          const paginatedUsers = mockUsers.slice(start, end);

          const response: ApiResponse<{ users: User[]; total: number; page: number }> = {
            data: {
              users: paginatedUsers,
              total: mockUsers.length,
              page,
            },
            status: 200,
            message: 'Paginated users retrieved successfully',
          };
          return HttpResponse.json(response);
        }),
        http.get('https://api.example.com/users/search', ({ request }) => {
          const url = new URL(request.url);
          const query = url.searchParams.get('q')?.toLowerCase() || '';

          const filteredUsers = mockUsers.filter(
            user =>
              user.name.toLowerCase().includes(query) || user.email.toLowerCase().includes(query)
          );

          const response: ApiResponse<User[]> = {
            data: filteredUsers,
            status: 200,
            message: `Found ${filteredUsers.length} users matching "${query}"`,
          };
          return HttpResponse.json(response);
        }),
        http.get('https://api.example.com/unreliable', () => {
          const shouldFail = Math.random() > 0.5;

          if (shouldFail) {
            return HttpResponse.json(
              { data: null, status: 500, message: 'Random server error' },
              { status: 500 }
            );
          }

          const response: ApiResponse<string> = {
            data: 'Success! This endpoint randomly fails.',
            status: 200,
            message: 'Request succeeded',
          };
          return HttpResponse.json(response);
        }),
      ],
    },
  },
};

// Story showing only error responses
export const AllErrors: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get('https://api.example.com/users', () => {
          return HttpResponse.json(
            { data: null, status: 500, message: 'Failed to load users' },
            { status: 500 }
          );
        }),
        http.get('https://api.example.com/posts', () => {
          return HttpResponse.json(
            { data: null, status: 500, message: 'Failed to load posts' },
            { status: 500 }
          );
        }),
        http.get('https://api.example.com/error', () => {
          return HttpResponse.json(
            { data: null, status: 500, message: 'Internal server error' },
            { status: 500 }
          );
        }),
        // Other endpoints also fail
        http.get('https://api.example.com/*', () => {
          return HttpResponse.json(
            { data: null, status: 500, message: 'Server unavailable' },
            { status: 500 }
          );
        }),
      ],
    },
  },
};

// Story showing slow loading states
export const SlowResponses: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get('https://api.example.com/users', async () => {
          await new Promise(resolve => setTimeout(resolve, 3000));
          const response: ApiResponse<User[]> = {
            data: mockUsers,
            status: 200,
            message: 'Users retrieved successfully',
          };
          return HttpResponse.json(response);
        }),
        http.get('https://api.example.com/posts', async () => {
          await new Promise(resolve => setTimeout(resolve, 2000));
          const response: ApiResponse<Post[]> = {
            data: mockPosts,
            status: 200,
            message: 'Posts retrieved successfully',
          };
          return HttpResponse.json(response);
        }),
        // Keep other endpoints fast for comparison
        http.get('https://api.example.com/*', () => {
          return HttpResponse.json({ data: null, status: 200, message: 'Fast response' });
        }),
      ],
    },
  },
};
