import { useState } from 'react';
import { api } from '../../api/apiClient';
import type { User, Post } from '../../types';

export function ApiDemo() {
  const [users, setUsers] = useState<User[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.getUsers();
      setUsers(response.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  const fetchPosts = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.getPosts();
      setPosts(response.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch posts');
    } finally {
      setLoading(false);
    }
  };

  const testError = async () => {
    setLoading(true);
    setError(null);
    try {
      await api.getError();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  const testSlowResponse = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.getSlowResponse();
      console.log('Slow response:', response.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch slow response');
    } finally {
      setLoading(false);
    }
  };

  const testPaginated = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.getUsersPaginated(1, 3);
      setUsers(response.data.users);
      console.log('Paginated response:', response.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch paginated users');
    } finally {
      setLoading(false);
    }
  };

  const testSearch = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.searchUsers('Alice');
      setUsers(response.data);
      console.log('Search response:', response.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to search users');
    } finally {
      setLoading(false);
    }
  };

  const testEmpty = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.getEmptyUsers();
      setUsers(response.data);
      console.log('Empty response:', response.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch empty users');
    } finally {
      setLoading(false);
    }
  };

  const testUnreliable = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.getUnreliableResponse();
      console.log('Unreliable response:', response.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unreliable endpoint failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h2>MSW API Demo</h2>
      <p>This component demonstrates MSW intercepting API calls in development mode.</p>

      <div style={{ marginBottom: '20px' }}>
        <button onClick={fetchUsers} disabled={loading}>
          Fetch Users
        </button>
        <button onClick={fetchPosts} disabled={loading} style={{ marginLeft: '10px' }}>
          Fetch Posts
        </button>
        <button onClick={testError} disabled={loading} style={{ marginLeft: '10px' }}>
          Test Error
        </button>
        <button onClick={testSlowResponse} disabled={loading} style={{ marginLeft: '10px' }}>
          Test Slow Response (2s)
        </button>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <button onClick={() => testPaginated()} disabled={loading}>
          Get Page 1 (3 users)
        </button>
        <button onClick={() => testSearch()} disabled={loading} style={{ marginLeft: '10px' }}>
          Search "Alice"
        </button>
        <button onClick={() => testEmpty()} disabled={loading} style={{ marginLeft: '10px' }}>
          Test Empty State
        </button>
        <button onClick={() => testUnreliable()} disabled={loading} style={{ marginLeft: '10px' }}>
          Test Random Failure
        </button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}

      {users.length > 0 && (
        <div style={{ marginBottom: '20px' }}>
          <h3>Users</h3>
          <ul>
            {users.map(user => (
              <li key={user.id}>
                {user.name} ({user.email})
              </li>
            ))}
          </ul>
        </div>
      )}

      {posts.length > 0 && (
        <div>
          <h3>Posts</h3>
          <ul>
            {posts.map(post => (
              <li key={post.id}>
                <strong>{post.title}</strong> by {post.author.name}
                <p>{post.content}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
