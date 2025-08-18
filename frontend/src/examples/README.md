# API Client with Zod + TanStack Query Examples

This directory contains complete examples of how to build a type-safe API client using Zod schema validation and TanStack Query for data fetching.

## 🚀 Quick Start

To see the examples in action, import and use the `ApiExamplesApp` component:

```tsx
import { ApiExamplesApp } from './examples/ApiExamplesApp';

// In your main App component
function App() {
  return <ApiExamplesApp />;
}
```

## 📁 File Structure

```
src/
├── schemas/index.ts         # Zod schemas and types
├── api/apiClient.ts         # Enhanced API client with validation  
├── hooks/api.ts             # TanStack Query hooks
├── providers/QueryProvider.tsx  # Query client setup
└── examples/
    ├── README.md            # This file
    ├── ApiExamplesApp.tsx   # Demo app
    └── UsersExample.tsx     # User query examples (GET requests)
```

## 🛡️ Zod Schema Benefits

```tsx
// Define schemas once, get TypeScript types automatically
export const UserSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  avatar: z.string().optional(),
});

// Inferred TypeScript type
export type User = z.infer<typeof UserSchema>;

// Runtime validation
const result = UserSchema.safeParse(apiResponse);
if (!result.success) {
  console.error('Validation failed:', result.error.issues);
}
```

## ⚡ TanStack Query Integration

### Basic Query Hook

```tsx
export const useUsers = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: api.getUsers,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
```

### Query Keys Management

```tsx
export const queryKeys = {
  users: ['users'] as const,
  user: (id: string) => ['users', id] as const,
  usersPaginated: (page: number, limit: number) => ['users', 'paginated', page, limit] as const,
  usersSearch: (query: string) => ['users', 'search', query] as const,
};
```

## 🔧 Setup Steps

### 1. Install Dependencies

```bash
npm install zod @tanstack/react-query @tanstack/react-query-devtools
```

### 2. Create Query Provider

```tsx
// providers/QueryProvider.tsx
export const QueryProvider = ({ children }) => {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
      },
    },
  }));

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};
```

### 3. Define Schemas

```tsx
// schemas/index.ts
export const UserSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  avatar: z.string().optional(),
});

export const createApiResponseSchema = <T extends z.ZodTypeAny>(dataSchema: T) =>
  z.object({
    data: dataSchema,
    status: z.number(),
    message: z.string(),
  });

export const UsersResponseSchema = createApiResponseSchema(z.array(UserSchema));
```

### 4. Build API Client

```tsx
// api/apiClient.ts
export const apiClientWithValidation = async <T>(
  endpoint: string,
  schema: z.ZodSchema<T>,
  options: RequestOptions = {}
): Promise<T> => {
  const data = await apiClient<unknown>(endpoint, options);
  
  // Validate the response data with Zod
  const result = schema.safeParse(data);
  
  if (!result.success) {
    throw new ApiValidationError(
      `API response validation failed for ${endpoint}`,
      result.error.issues
    );
  }
  
  return result.data;
};

export const api = {
  getUsers: () => apiClientWithValidation('/users', UsersResponseSchema),
  getUser: (id: string) => apiClientWithValidation(`/users/${id}`, UserResponseSchema),
  // ... other user endpoints
};
```

### 5. Create Query Hooks

```tsx
// hooks/api.ts
export const useUsers = (options?: UseQueryOptions<UsersResponse, Error>) => {
  return useQuery({
    queryKey: queryKeys.users,
    queryFn: api.getUsers,
    staleTime: 5 * 60 * 1000,
    ...options,
  });
};

export const useUser = (id: string, options?: UseQueryOptions<UserResponse, Error>) => {
  return useQuery({
    queryKey: queryKeys.user(id),
    queryFn: () => api.getUser(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
    ...options,
  });
};
```

## 💡 Key Benefits

- ✅ **Runtime Type Safety** - Zod validates all API responses
- ✅ **Automatic Caching** - TanStack Query handles caching and invalidation  
- ✅ **Error Handling** - Centralized error boundaries and validation
- ✅ **DevTools Support** - Built-in debugging with React Query DevTools
- ✅ **TypeScript Integration** - Full type safety from API to UI

## 📚 Learning Resources

- [Zod Documentation](https://zod.dev/)
- [TanStack Query Guide](https://tanstack.com/query/latest)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

## 🎯 Example Usage

```tsx
function UsersList() {
  const { data, isLoading, error } = useUsers();
  
  if (isLoading) return <div>Loading users...</div>;
  if (error) return <div>Error: {error.message}</div>;
  
  return (
    <ul>
      {data?.data.map(user => (
        <li key={user.id}>
          {user.name} ({user.email})
        </li>
      ))}
    </ul>
  );
}
```

This pattern gives you a robust, type-safe foundation for handling API data in your React applications.