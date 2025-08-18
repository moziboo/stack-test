# 🚀 API Client with Zod + TanStack Query Setup Guide

This guide shows how to integrate the new type-safe API client with Zod validation and TanStack Query into your existing app.

## 📦 Dependencies Installed

```bash
npm install zod @tanstack/react-query @tanstack/react-query-devtools
```

## 🔧 Integration Steps

### 1. Wrap Your App with QueryProvider

Update your main `App.tsx` or root component:

```tsx
import { QueryProvider } from './src/providers/QueryProvider';
import { ApiExamplesApp } from './src/examples/ApiExamplesApp';

function App() {
  return (
    <QueryProvider>
      {/* Your existing app components */}
      <YourExistingComponents />
      
      {/* Or try the complete examples */}
      <ApiExamplesApp />
    </QueryProvider>
  );
}
```

### 2. Replace Old Types with New Schemas

**Before (src/types/index.ts):**
```tsx
export type User = {
  id: string;
  name: string;
  email: string;
  avatar?: string;
};
```

**After (src/schemas/index.ts):**
```tsx
import { z } from 'zod';

export const UserSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  avatar: z.string().optional(),
});

export type User = z.infer<typeof UserSchema>;
```

### 3. Update Components to Use New Hooks

**Before:**
```tsx
import { useEffect, useState } from 'react';
import { api } from '../api/apiClient';

function UsersList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getUsers().then(setUsers).finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading...</div>;
  
  return (
    <div>
      {users.map(user => <div key={user.id}>{user.name}</div>)}
    </div>
  );
}
```

**After:**
```tsx
import { useUsers } from '../hooks/api';

function UsersList() {
  const { data: usersData, isLoading, error } = useUsers();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!usersData) return <div>No data</div>;
  
  return (
    <div>
      {usersData.data.map(user => <div key={user.id}>{user.name}</div>)}
    </div>
  );
}
```

## 🎯 Key Benefits You Get

### 🛡️ Runtime Type Safety
- Zod validates all API responses at runtime
- Catches API contract changes immediately
- Detailed validation error messages

### ⚡ Automatic Caching & Updates
- TanStack Query handles all caching automatically
- Background refetching when data goes stale
- Request deduplication across components

### 🎛️ Built-in Loading States
- `isLoading`, `error`, `data` states out of the box
- No more manual loading state management
- Consistent error handling patterns

### 🔄 Smart Mutations
- Automatic cache invalidation after mutations
- Optimistic updates for better UX
- Built-in retry logic with exponential backoff

## 📁 File Structure Overview

```
src/
├── schemas/index.ts         # ✅ Zod schemas (replaces types/index.ts)
├── api/apiClient.ts         # ✅ Enhanced with validation
├── hooks/api.ts             # ✅ TanStack Query hooks
├── providers/QueryProvider.tsx  # ✅ Query client setup
└── examples/                # ✅ Complete working examples
    ├── ApiExamplesApp.tsx   # Demo app
    ├── UsersExample.tsx     # Query examples
    └── PostsExample.tsx     # Mutation examples
```

## 🚀 Try the Examples

To see everything in action:

```tsx
import { ApiExamplesApp } from './src/examples/ApiExamplesApp';

// Render this component to see the full demo
<ApiExamplesApp />
```

The examples include:
- ✅ Loading and error states
- ✅ Paginated data fetching
- ✅ Search with debouncing
- ✅ Create/update mutations
- ✅ Cache invalidation
- ✅ Real-time dev tools

## 🔍 Dev Tools

Open your browser dev tools and look for the React Query panel to inspect:
- Active queries and their states
- Cache contents and timing
- Network requests and responses
- Query invalidation events

## 🎨 Next Steps

1. **Replace existing API calls** with the new hooks gradually
2. **Add more schemas** for other API endpoints
3. **Implement optimistic updates** for better UX
4. **Add error boundaries** for better error handling
5. **Configure cache policies** for different data types

## 💡 Pro Tips

- Use the `enabled` option to conditionally run queries
- Leverage `staleTime` and `gcTime` for optimal caching
- Create custom hooks for complex query logic
- Use `queryClient.invalidateQueries()` to refresh related data
- Take advantage of the dev tools for debugging cache issues
