import apiClient from './apiClient';
import type { User } from './apiClient';

export const getUsers = async (): Promise<User[]> => {
  const response = await apiClient.get<User[]>('/users');
  return response.data; // Extract just the users array
};

export const getUserById = async (id: string): Promise<User> => {
  const response = await apiClient.get<User>(`/users/${id}`);
  return response.data; // Now the response is directly the user object
};
