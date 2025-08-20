import type { User } from '../../types';

export class UserBuilder {
  private user: User = {
    id: 'default-id',
    name: 'Default Name',
    email: 'default@example.com',
  };

  withId(id: string): UserBuilder {
    this.user.id = id;
    return this;
  }

  withName(name: string): UserBuilder {
    this.user.name = name;
    return this;
  }

  withEmail(email: string): UserBuilder {
    this.user.email = email;
    return this;
  }

  withAvatar(avatar: string): UserBuilder {
    this.user.avatar = avatar;
    return this;
  }

  withoutAvatar(): UserBuilder {
    delete this.user.avatar;
    return this;
  }

  build(): User {
    return { ...this.user };
  }

  // Helper for creating invalid users for testing
  buildInvalid(overrides: Partial<any>): any {
    return { ...this.user, ...overrides };
  }
}

// Convenience function
export const aUser = () => new UserBuilder();
