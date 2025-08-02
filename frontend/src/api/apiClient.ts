import type { User, Post, ApiResponse } from '../types';

const API_BASE_URL = 'https://api.example.com';

type RequestOptions = {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  headers?: Record<string, string>;
  body?: Record<string, unknown>;
};

/**
 * Generic API client for making HTTP requests
 */
export const apiClient = async <T>(endpoint: string, options: RequestOptions = {}): Promise<T> => {
  const { method = 'GET', headers = {}, body } = options;

  const config: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
};

// Convenience functions for common API calls
export const api = {
  // Users
  getUsers: () => apiClient<ApiResponse<User[]>>('/users'),
  getUser: (id: string) => apiClient<ApiResponse<User>>(`/users/${id}`),

  // Posts
  getPosts: () => apiClient<ApiResponse<Post[]>>('/posts'),
  getPost: (id: string) => apiClient<ApiResponse<Post>>(`/posts/${id}`),
  createPost: (post: Partial<Post>) =>
    apiClient<ApiResponse<Post>>('/posts', {
      method: 'POST',
      body: post,
    }),

  // Test endpoints
  getError: () => apiClient<ApiResponse<never>>('/error'),
  getSlowResponse: () => apiClient<ApiResponse<string>>('/slow'),

  // Additional endpoints for component development
  getUsersPaginated: (page: number = 1, limit: number = 10) =>
    apiClient<ApiResponse<{ users: User[]; total: number; page: number }>>(
      `/users/paginated?page=${page}&limit=${limit}`
    ),
  searchUsers: (query: string) =>
    apiClient<ApiResponse<User[]>>(`/users/search?q=${encodeURIComponent(query)}`),
  getEmptyUsers: () => apiClient<ApiResponse<User[]>>('/users/empty'),
  getUnreliableResponse: () => apiClient<ApiResponse<string>>('/unreliable'),
};
