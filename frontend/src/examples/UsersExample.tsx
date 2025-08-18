import { useState } from 'react';
import {
  useUsers,
  useUser,
  useUsersPaginated,
  useUsersSearch,
  useApiErrorHandler,
} from '../hooks/api';

export const UsersExample = () => {
  const [selectedUserId, setSelectedUserId] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(1);
  const handleError = useApiErrorHandler();

  // Basic query - fetches all users
  const {
    data: usersData,
    isLoading: usersLoading,
    error: usersError,
    refetch: refetchUsers,
  } = useUsers();

  // Conditional query - only runs when selectedUserId is set
  const { data: userData, isLoading: userLoading, error: userError } = useUser(selectedUserId);

  // Paginated query
  const {
    data: paginatedData,
    isLoading: paginatedLoading,
    error: paginatedError,
  } = useUsersPaginated(currentPage, 5);

  // Search query - only runs when searchQuery is not empty
  const {
    data: searchData,
    isLoading: searchLoading,
    error: searchError,
  } = useUsersSearch(searchQuery);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Users API Examples (Simplified)</h1>

      {/* Basic Users List */}
      <section style={{ marginBottom: '30px' }}>
        <h2>All Users</h2>
        <button onClick={() => refetchUsers()}>Refresh Users</button>

        {usersLoading && <p>Loading users...</p>}
        {usersError && <p style={{ color: 'red' }}>Error: {handleError(usersError)}</p>}
        {usersData && (
          <div>
            <p>
              Status: {usersData.status} - {usersData.message}
            </p>
            <ul>
              {usersData.data.map(user => (
                <li key={user.id} style={{ marginBottom: '10px' }}>
                  <strong>{user.name}</strong> ({user.email})
                  <button onClick={() => setSelectedUserId(user.id)} style={{ marginLeft: '10px' }}>
                    View Details
                  </button>
                  {user.avatar && (
                    <img
                      src={user.avatar}
                      alt={`${user.name} avatar`}
                      style={{ width: '30px', height: '30px', marginLeft: '10px' }}
                    />
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>

      {/* Single User Details */}
      <section style={{ marginBottom: '30px' }}>
        <h2>User Details</h2>
        <input
          type="text"
          placeholder="Enter user ID"
          value={selectedUserId}
          onChange={e => setSelectedUserId(e.target.value)}
          style={{ padding: '8px', marginRight: '10px' }}
        />

        {userLoading && selectedUserId && <p>Loading user details...</p>}
        {userError && <p style={{ color: 'red' }}>Error: {handleError(userError)}</p>}
        {userData && (
          <div style={{ background: '#f0f0f0', padding: '15px', borderRadius: '8px' }}>
            <h3>{userData.data.name}</h3>
            <p>Email: {userData.data.email}</p>
            <p>ID: {userData.data.id}</p>
            {userData.data.avatar && (
              <img
                src={userData.data.avatar}
                alt={`${userData.data.name} avatar`}
                style={{ width: '60px', height: '60px' }}
              />
            )}
          </div>
        )}
      </section>

      {/* Paginated Users */}
      <section style={{ marginBottom: '30px' }}>
        <h2>Paginated Users</h2>
        <div style={{ marginBottom: '10px' }}>
          <button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span style={{ margin: '0 15px' }}>Page {currentPage}</span>
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={!paginatedData || currentPage * 5 >= paginatedData.data.total}
          >
            Next
          </button>
        </div>

        {paginatedLoading && <p>Loading paginated users...</p>}
        {paginatedError && <p style={{ color: 'red' }}>Error: {handleError(paginatedError)}</p>}
        {paginatedData && (
          <div>
            <p>
              Showing {paginatedData.data.users.length} of {paginatedData.data.total} users
            </p>
            <ul>
              {paginatedData.data.users.map(user => (
                <li key={user.id}>
                  {user.name} - {user.email}
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>

      {/* Search Users */}
      <section style={{ marginBottom: '30px' }}>
        <h2>Search Users</h2>
        <input
          type="text"
          placeholder="Search users..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          style={{ padding: '8px', width: '300px' }}
        />

        {searchLoading && searchQuery && <p>Searching...</p>}
        {searchError && <p style={{ color: 'red' }}>Error: {handleError(searchError)}</p>}
        {searchData && searchQuery && (
          <div>
            <p>
              Found {searchData.data.length} users matching "{searchQuery}"
            </p>
            <ul>
              {searchData.data.map(user => (
                <li key={user.id}>
                  {user.name} - {user.email}
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>

      {/* Simple API Benefits */}
      <section style={{ background: '#e8f4f8', padding: '15px', borderRadius: '8px' }}>
        <h3>✨ Simple API Client Features:</h3>
        <ul>
          <li>
            <strong>TypeScript Types:</strong> Basic type safety with TypeScript interfaces
          </li>
          <li>
            <strong>Loading States:</strong> Manual loading and error state management
          </li>
          <li>
            <strong>Error Handling:</strong> Simple try/catch error handling
          </li>
          <li>
            <strong>Fetch API:</strong> Direct use of browser fetch API
          </li>
          <li>
            <strong>Lightweight:</strong> No external dependencies for data fetching
          </li>
          <li>
            <strong>Simple Debouncing:</strong> Basic search debouncing with setTimeout
          </li>
        </ul>
      </section>
    </div>
  );
};
