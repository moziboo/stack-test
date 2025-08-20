import { describe, it, expect } from 'vitest';
import { aUser } from './userBuilder';

describe('Builder Pattern Example', () => {
  it('shows how builders work', () => {
    // Default user - minimal setup
    const defaultUser = aUser().build();
    expect(defaultUser.name).toBe('Default Name');

    // User with custom name - only change what you need
    const johnUser = aUser().withName('John Doe').withId('john-123').build();
    expect(johnUser.name).toBe('John Doe');
    expect(johnUser.id).toBe('john-123');
    expect(johnUser.email).toBe('default@example.com'); // Still has default

    // User with avatar
    const userWithAvatar = aUser()
      .withName('Jane')
      .withAvatar('https://example.com/jane.jpg')
      .build();
    expect(userWithAvatar.avatar).toBe('https://example.com/jane.jpg');

    // User without avatar (explicitly)
    const userWithoutAvatar = aUser().withName('Bob').withoutAvatar().build();
    expect(userWithoutAvatar.avatar).toBeUndefined();

    // Chain multiple changes fluently
    const complexUser = aUser()
      .withId('complex-user')
      .withName('Complex User')
      .withEmail('complex@test.com')
      .withAvatar('https://example.com/complex.jpg')
      .build();

    expect(complexUser).toEqual({
      id: 'complex-user',
      name: 'Complex User',
      email: 'complex@test.com',
      avatar: 'https://example.com/complex.jpg',
    });
  });

  it('shows builders for invalid data testing', () => {
    // Create invalid user for testing validation
    const invalidUser = aUser().buildInvalid({ email: 'not-an-email' }); // Override with invalid email

    expect(invalidUser.email).toBe('not-an-email');
    expect(invalidUser.name).toBe('Default Name'); // Still has other defaults
  });
});
