import UBTable from './components/UBTable';
import type { User } from './api/apiClient';
import { useQuery } from '@tanstack/react-query';

function AppContent() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['users'],
    queryFn: () => fetch('https://api.example.com/users').then(res => res.json()),
  });

  return (
    <main>
      {isLoading && <div>Loading...</div>}
      {error && <div>Error: {error.message}</div>}
      {data && (
        <UBTable striped>
          <UBTable.Header>
            <UBTable.Row>
              <UBTable.HeaderCell>ID</UBTable.HeaderCell>
              <UBTable.HeaderCell>Name</UBTable.HeaderCell>
              <UBTable.HeaderCell>Email</UBTable.HeaderCell>
            </UBTable.Row>
          </UBTable.Header>
          <UBTable.Body>
            {data.data.map((user: User) => (
              <UBTable.Row key={user.id}>
                <UBTable.Cell>{user.id}</UBTable.Cell>
                <UBTable.Cell>{user.name}</UBTable.Cell>
                <UBTable.Cell>{user.email}</UBTable.Cell>
              </UBTable.Row>
            ))}
          </UBTable.Body>
        </UBTable>
      )}
    </main>
  );
}

function App() {
  return <AppContent />;
}

export default App;
