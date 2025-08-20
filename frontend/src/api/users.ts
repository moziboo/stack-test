import apiClient from './apiClient';
import { userSchema, usersSchema, type User, type Users } from '../types';

export const getUsers = async (): Promise<Users> => {
  try {
    const response = await apiClient.get('/users');
    const result = usersSchema.safeParse(response.data);

    if (!result.success) {
      const validationError = new Error(`Data validation failed: ${result.error.message}`);
      validationError.name = 'ValidationError';
      throw validationError;
    }

    return result.data;
  } catch (error) {
    // Re-throw validation errors as-is
    if (error instanceof Error && error.name === 'ValidationError') {
      throw error;
    }
    // Network/HTTP errors from axios
    throw new Error(
      `Failed to fetch users: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
};

export const getUserById = async (id: string): Promise<User> => {
  try {
    const response = await apiClient.get(`/users/${id}`);
    const result = userSchema.safeParse(response.data);

    if (!result.success) {
      const validationError = new Error(`Data validation failed: ${result.error.message}`);
      validationError.name = 'ValidationError';
      throw validationError;
    }

    return result.data;
  } catch (error) {
    // Re-throw validation errors as-is
    if (error instanceof Error && error.name === 'ValidationError') {
      throw error;
    }
    // Network/HTTP errors from axios
    throw new Error(
      `Failed to fetch user: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
};
