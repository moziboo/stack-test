const API_BASE_URL = 'https://api.example.com';

type RequestOptions = {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  headers?: Record<string, string>;
  body?: Record<string, unknown>;
};

// Basic types for API responses
export type User = {
  id: string;
  name: string;
  email: string;
  avatar?: string;
};

export type ApiResponse<T> = {
  data: T;
  status: number;
  message: string;
};

export type PaginatedResponse<T> = {
  data: {
    users: T[];
    total: number;
    page: number;
  };
  status: number;
  message: string;
};

/**
 * Simple API client for making HTTP requests
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
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
};

// Simple API functions without validation
export const api = {
  // Users
  getUsers: () => apiClient<ApiResponse<User[]>>('/users'),
  getUser: (id: string) => apiClient<ApiResponse<User>>(`/users/${id}`),

  // Test endpoints
  getError: () => apiClient<ApiResponse<never>>('/error'),
  getSlowResponse: () => apiClient<ApiResponse<string>>('/slow'),

  // Additional endpoints
  getUsersPaginated: (page: number = 1, limit: number = 10) =>
    apiClient<PaginatedResponse<User>>(`/users/paginated?page=${page}&limit=${limit}`),
  searchUsers: (query: string) =>
    apiClient<ApiResponse<User[]>>(`/users/search?q=${encodeURIComponent(query)}`),
  getEmptyUsers: () => apiClient<ApiResponse<User[]>>('/users/empty'),
  getUnreliableResponse: () => apiClient<ApiResponse<string>>('/unreliable'),
};
