import { useState, useEffect, useCallback } from 'react';
import { api } from '../api/apiClient';
import type { User, ApiResponse, PaginatedResponse } from '../api/apiClient';

// Simple hook state types
type ApiState<T> = {
  data: T | null;
  isLoading: boolean;
  error: Error | null;
};

// Basic hooks using React state instead of TanStack Query
export const useUsers = () => {
  const [state, setState] = useState<ApiState<ApiResponse<User[]>>>({
    data: null,
    isLoading: false,
    error: null,
  });

  const fetchUsers = async () => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    try {
      const data = await api.getUsers();
      setState({ data, isLoading: false, error: null });
    } catch (error) {
      setState({ data: null, isLoading: false, error: error as Error });
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return {
    ...state,
    refetch: fetchUsers,
  };
};

export const useUser = (id: string) => {
  const [state, setState] = useState<ApiState<ApiResponse<User>>>({
    data: null,
    isLoading: false,
    error: null,
  });

  const fetchUser = useCallback(async () => {
    if (!id) return;

    setState(prev => ({ ...prev, isLoading: true, error: null }));
    try {
      const data = await api.getUser(id);
      setState({ data, isLoading: false, error: null });
    } catch (error) {
      setState({ data: null, isLoading: false, error: error as Error });
    }
  }, [id]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return {
    ...state,
    refetch: fetchUser,
  };
};

export const useUsersPaginated = (page: number = 1, limit: number = 10) => {
  const [state, setState] = useState<ApiState<PaginatedResponse<User>>>({
    data: null,
    isLoading: false,
    error: null,
  });

  const fetchUsers = useCallback(async () => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    try {
      const data = await api.getUsersPaginated(page, limit);
      setState({ data, isLoading: false, error: null });
    } catch (error) {
      setState({ data: null, isLoading: false, error: error as Error });
    }
  }, [page, limit]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return {
    ...state,
    refetch: fetchUsers,
  };
};

export const useUsersSearch = (query: string) => {
  const [state, setState] = useState<ApiState<ApiResponse<User[]>>>({
    data: null,
    isLoading: false,
    error: null,
  });

  const searchUsers = useCallback(async () => {
    if (!query.trim()) {
      setState({ data: null, isLoading: false, error: null });
      return;
    }

    setState(prev => ({ ...prev, isLoading: true, error: null }));
    try {
      const data = await api.searchUsers(query);
      setState({ data, isLoading: false, error: null });
    } catch (error) {
      setState({ data: null, isLoading: false, error: error as Error });
    }
  }, [query]);

  useEffect(() => {
    const timeoutId = setTimeout(searchUsers, 300); // Debounce search
    return () => clearTimeout(timeoutId);
  }, [searchUsers]);

  return {
    ...state,
    refetch: searchUsers,
  };
};

// Simple error handler
export const useApiErrorHandler = () => {
  return (error: Error) => {
    if (error.message.includes('API error: 404')) {
      return 'Resource not found';
    }

    if (error.message.includes('API error: 500')) {
      return 'Server error occurred';
    }

    return 'An unexpected error occurred';
  };
};
