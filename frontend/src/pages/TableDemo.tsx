import UBTable from '../components/UBTable';
import type { User } from '../types';
import { useQuery } from '@tanstack/react-query';
import { getUsers } from '../api/users';

function TableDemo() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['users'],
    queryFn: getUsers,
  });

  // Handle loading state
  if (isLoading) {
    return <div>Loading users...</div>;
  }

  // Handle error state
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  // Handle no data
  if (!data) {
    return <div>No users found</div>;
  }

  return (
    <main>
      <UBTable striped>
        <UBTable.Header>
          <UBTable.Row>
            <UBTable.HeaderCell>ID</UBTable.HeaderCell>
            <UBTable.HeaderCell>Name</UBTable.HeaderCell>
            <UBTable.HeaderCell>Email</UBTable.HeaderCell>
          </UBTable.Row>
        </UBTable.Header>
        <UBTable.Body>
          {data.map((user: User) => (
            <UBTable.Row key={user.id}>
              <UBTable.Cell>{user.id}</UBTable.Cell>
              <UBTable.Cell>{user.name}</UBTable.Cell>
              <UBTable.Cell>{user.email}</UBTable.Cell>
            </UBTable.Row>
          ))}
        </UBTable.Body>
      </UBTable>
    </main>
  );
}

export default TableDemo;
