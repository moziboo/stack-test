import { http, HttpResponse } from 'msw';
import type { User, Post, ApiResponse } from '../../types';
import { createMockUser, createMockPost } from '../testUtils';

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

const mockPosts: Post[] = [
  createMockPost({
    id: 'post-1',
    title: 'Getting Started with React',
    content: 'React is a powerful library for building user interfaces...',
    author: mockUsers[0],
  }),
  createMockPost({
    id: 'post-2',
    title: 'Understanding TypeScript',
    content: 'TypeScript adds static typing to JavaScript...',
    author: mockUsers[1],
  }),
  createMockPost({
    id: 'post-3',
    title: 'Testing with Vitest',
    content: 'Vitest is a fast unit testing framework...',
    author: mockUsers[2],
  }),
];

// API handlers that match your API client expectations
export const handlers = [
  // Get all users
  http.get('https://api.example.com/users', () => {
    const response: ApiResponse<User[]> = {
      data: mockUsers,
      status: 200,
      message: 'Users retrieved successfully',
    };
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

  // Get all posts
  http.get('https://api.example.com/posts', () => {
    const response: ApiResponse<Post[]> = {
      data: mockPosts,
      status: 200,
      message: 'Posts retrieved successfully',
    };
    return HttpResponse.json(response);
  }),

  // Get post by ID
  http.get('https://api.example.com/posts/:id', ({ params }) => {
    const { id } = params;
    const post = mockPosts.find(p => p.id === id);

    if (!post) {
      return HttpResponse.json(
        { data: null, status: 404, message: 'Post not found' },
        { status: 404 }
      );
    }

    const response: ApiResponse<Post> = {
      data: post,
      status: 200,
      message: 'Post retrieved successfully',
    };
    return HttpResponse.json(response);
  }),

  // Create a new post
  http.post('https://api.example.com/posts', async ({ request }) => {
    const body = (await request.json()) as Partial<Post>;

    const newPost = createMockPost({
      id: `post-${Date.now()}`,
      title: body.title || 'Untitled',
      content: body.content || '',
      author: mockUsers[0], // Default to first user
    });

    mockPosts.push(newPost);

    const response: ApiResponse<Post> = {
      data: newPost,
      status: 201,
      message: 'Post created successfully',
    };
    return HttpResponse.json(response, { status: 201 });
  }),

  // Simulate an error endpoint for testing error handling
  http.get('https://api.example.com/error', () => {
    return HttpResponse.json(
      { data: null, status: 500, message: 'Internal server error' },
      { status: 500 }
    );
  }),

  // Simulate network delay for testing loading states
  http.get('https://api.example.com/slow', async () => {
    // Add a 2-second delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    const response: ApiResponse<string> = {
      data: 'This response was delayed by 2 seconds',
      status: 200,
      message: 'Slow response completed',
    };
    return HttpResponse.json(response);
  }),

  // Paginated endpoints for lists
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

  // Search functionality
  http.get('https://api.example.com/users/search', ({ request }) => {
    const url = new URL(request.url);
    const query = url.searchParams.get('q')?.toLowerCase() || '';

    const filteredUsers = mockUsers.filter(
      user => user.name.toLowerCase().includes(query) || user.email.toLowerCase().includes(query)
    );

    const response: ApiResponse<User[]> = {
      data: filteredUsers,
      status: 200,
      message: `Found ${filteredUsers.length} users matching "${query}"`,
    };
    return HttpResponse.json(response);
  }),

  // Empty state endpoint
  http.get('https://api.example.com/users/empty', () => {
    const response: ApiResponse<User[]> = {
      data: [],
      status: 200,
      message: 'No users found',
    };
    return HttpResponse.json(response);
  }),

  // Random failure endpoint (50% chance of failure)
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
];
