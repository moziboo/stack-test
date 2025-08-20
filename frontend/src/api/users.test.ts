import { describe, it, expect } from 'vitest';
import { http, HttpResponse } from 'msw';
import { server } from '../test/mocks/server';
import { getUsers, getUserById } from './users';

describe('Users API', () => {
  describe('getUsers', () => {
    it('should fetch and validate users successfully', async () => {
      const result = await getUsers();

      // Just test that we got valid data - Zod already validated the shape
      expect(result).toBeDefined();
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeGreaterThan(0);

      // Trust that if Zod validation passed, the data is correct
      // Only test business logic, not schema validation
    });

    it('should handle empty users array', async () => {
      // Override the default handler for this test
      server.use(
        http.get('https://api.example.com/users', () => {
          return HttpResponse.json([]);
        })
      );

      const result = await getUsers();
      expect(result).toEqual([]);
    });

    it('should throw validation error for invalid user data', async () => {
      // Mock invalid response (missing required fields)
      server.use(
        http.get('https://api.example.com/users', () => {
          return HttpResponse.json([
            { id: 'user-1', name: 'Test User' }, // Missing email
          ]);
        })
      );

      await expect(getUsers()).rejects.toThrow('Data validation failed');
    });

    it('should throw validation error for wrong data type', async () => {
      // Mock response with wrong data types
      server.use(
        http.get('https://api.example.com/users', () => {
          return HttpResponse.json([
            { id: 123, name: 'Test User', email: 'test@example.com' }, // id should be string
          ]);
        })
      );

      await expect(getUsers()).rejects.toThrow('Data validation failed');
    });

    it('should throw validation error for non-array response', async () => {
      // Mock response that's not an array
      server.use(
        http.get('https://api.example.com/users', () => {
          return HttpResponse.json({ users: [] }); // Should be array directly
        })
      );

      await expect(getUsers()).rejects.toThrow('Data validation failed');
    });

    it('should handle network errors', async () => {
      // Mock network failure
      server.use(
        http.get('https://api.example.com/users', () => {
          return HttpResponse.error();
        })
      );

      await expect(getUsers()).rejects.toThrow('Failed to fetch users');
    });

    it('should handle 500 server error', async () => {
      server.use(
        http.get('https://api.example.com/users', () => {
          return HttpResponse.json({ message: 'Internal server error' }, { status: 500 });
        })
      );

      await expect(getUsers()).rejects.toThrow('Failed to fetch users');
    });
  });

  describe('getUserById', () => {
    it('should fetch and validate single user successfully', async () => {
      const result = await getUserById('user-1');

      // Just verify we got the right user - Zod handles the rest
      expect(result).toBeDefined();
      expect(result.id).toBe('user-1');
    });

    it('should handle user not found (404)', async () => {
      await expect(getUserById('nonexistent')).rejects.toThrow('Failed to fetch user');
    });

    it('should throw validation error for invalid user data', async () => {
      // Mock invalid user response
      server.use(
        http.get('https://api.example.com/users/:id', () => {
          return HttpResponse.json({
            id: 'user-1',
            name: 'Test User',
            // Missing email
          });
        })
      );

      await expect(getUserById('user-1')).rejects.toThrow('Data validation failed');
    });

    it('should handle user with optional avatar', async () => {
      // Mock user with avatar
      server.use(
        http.get('https://api.example.com/users/:id', () => {
          return HttpResponse.json({
            id: 'user-1',
            name: 'Test User',
            email: 'test@example.com',
            avatar: 'https://example.com/avatar.jpg',
          });
        })
      );

      const result = await getUserById('user-1');
      expect(result.avatar).toBe('https://example.com/avatar.jpg');
    });

    it('should handle user without avatar', async () => {
      // Mock user without avatar
      server.use(
        http.get('https://api.example.com/users/:id', () => {
          return HttpResponse.json({
            id: 'user-1',
            name: 'Test User',
            email: 'test@example.com',
          });
        })
      );

      const result = await getUserById('user-1');
      expect(result.avatar).toBeUndefined();
    });

    it('should validate email format', async () => {
      // Mock user with invalid email
      server.use(
        http.get('https://api.example.com/users/:id', () => {
          return HttpResponse.json({
            id: 'user-1',
            name: 'Test User',
            email: 'not-an-email', // Invalid email format
          });
        })
      );

      await expect(getUserById('user-1')).rejects.toThrow('Data validation failed');
    });

    it('should handle network errors', async () => {
      server.use(
        http.get('https://api.example.com/users/:id', () => {
          return HttpResponse.error();
        })
      );

      await expect(getUserById('user-1')).rejects.toThrow('Failed to fetch user');
    });
  });
});
