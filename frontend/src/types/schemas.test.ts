import { describe, it, expect } from 'vitest';
import { userSchema, usersSchema } from './index';

describe('Schemas', () => {
  describe('userSchema', () => {
    it('should validate valid user data', () => {
      const validUser = {
        id: 'user-1',
        name: 'John Doe',
        email: 'john@example.com',
        avatar: 'https://example.com/avatar.jpg',
      };

      const result = userSchema.safeParse(validUser);
      expect(result.success).toBe(true);
    });

    it('should validate user without avatar', () => {
      const validUser = {
        id: 'user-1',
        name: 'John Doe',
        email: 'john@example.com',
      };

      const result = userSchema.safeParse(validUser);
      expect(result.success).toBe(true);
    });

    it('should reject invalid email', () => {
      const invalidUser = {
        id: 'user-1',
        name: 'John Doe',
        email: 'not-an-email',
      };

      const result = userSchema.safeParse(invalidUser);
      expect(result.success).toBe(false);
    });

    it('should reject missing required fields', () => {
      const invalidUser = {
        id: 'user-1',
        name: 'John Doe',
        // missing email
      };

      const result = userSchema.safeParse(invalidUser);
      expect(result.success).toBe(false);
    });
  });

  describe('usersSchema', () => {
    it('should validate array of users', () => {
      const validUsers = [
        { id: 'user-1', name: 'John', email: 'john@example.com' },
        { id: 'user-2', name: 'Jane', email: 'jane@example.com' },
      ];

      const result = usersSchema.safeParse(validUsers);
      expect(result.success).toBe(true);
    });

    it('should validate empty array', () => {
      const result = usersSchema.safeParse([]);
      expect(result.success).toBe(true);
    });

    it('should reject non-array', () => {
      const result = usersSchema.safeParse({ users: [] });
      expect(result.success).toBe(false);
    });
  });
});
