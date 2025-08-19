import axios, { type AxiosInstance } from 'axios';

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

const apiClient: AxiosInstance = axios.create({
  baseURL: 'https://api.example.com',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

apiClient.interceptors.response.use(
  response => response,
  error => Promise.reject(error)
);

export default apiClient;
