export type User = {
  id: string;
  name: string;
  email: string;
  avatar?: string;
};

export type Post = {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  author: User;
};

export type ApiResponse<T> = {
  data: T;
  status: number;
  message: string;
};
