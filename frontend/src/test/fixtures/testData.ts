// Test fixtures are pre-defined data sets used across multiple tests

export const sampleUsers = [
  {
    id: 'user-1',
    name: 'Alice Johnson',
    email: 'alice@example.com',
    avatar: 'https://example.com/avatars/alice.jpg'
  },
  {
    id: 'user-2',
    name: 'Bob Smith',
    email: 'bob@example.com',
    avatar: 'https://example.com/avatars/bob.jpg'
  },
  {
    id: 'user-3',
    name: 'Carol Williams',
    email: 'carol@example.com',
    avatar: 'https://example.com/avatars/carol.jpg'
  }
];

export const samplePosts = [
  {
    id: 'post-1',
    title: 'Getting Started with React Testing',
    content: 'This is a comprehensive guide to testing React applications...',
    createdAt: '2023-06-15T10:30:00Z',
    author: sampleUsers[0]
  },
  {
    id: 'post-2',
    title: 'Advanced TypeScript Patterns',
    content: 'Learn how to use advanced TypeScript features in your React apps...',
    createdAt: '2023-06-20T14:45:00Z',
    author: sampleUsers[1]
  },
  {
    id: 'post-3',
    title: 'State Management Strategies',
    content: 'Comparing different state management approaches in React...',
    createdAt: '2023-06-25T09:15:00Z',
    author: sampleUsers[2]
  }
];

export const sampleComments = [
  {
    id: 'comment-1',
    postId: 'post-1',
    content: 'Great article! Very helpful.',
    author: sampleUsers[1],
    createdAt: '2023-06-16T08:30:00Z'
  },
  {
    id: 'comment-2',
    postId: 'post-1',
    content: 'I have a question about the testing approach...',
    author: sampleUsers[2],
    createdAt: '2023-06-17T11:20:00Z'
  }
]; 