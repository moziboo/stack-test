import type { Meta, StoryObj } from '@storybook/react-vite';
import UBTable from './UBTable';
import { type ComponentProps, useState, useMemo } from 'react';
import { fn } from 'storybook/test';

type UBTableProps = ComponentProps<typeof UBTable>;

const meta: Meta<UBTableProps> = {
  title: 'UBTable',
  component: UBTable,
  argTypes: {
    striped: { control: 'boolean' },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    caption: { control: 'text' },
  },
  args: {
    striped: false,
    size: 'md',
  },
};

export default meta;

type Story = StoryObj<UBTableProps>;

// Sample data for stories
const sampleData = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'Active' },
  { id: 3, name: 'Bob Wilson', email: 'bob@example.com', role: 'Editor', status: 'Inactive' },
  { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'User', status: 'Active' },
];

export const Default: Story = {
  render: args => (
    <UBTable {...args}>
      <UBTable.Header>
        <UBTable.Row>
          <UBTable.HeaderCell>Name</UBTable.HeaderCell>
          <UBTable.HeaderCell>Email</UBTable.HeaderCell>
          <UBTable.HeaderCell>Role</UBTable.HeaderCell>
          <UBTable.HeaderCell>Status</UBTable.HeaderCell>
        </UBTable.Row>
      </UBTable.Header>
      <UBTable.Body>
        {sampleData.map(user => (
          <UBTable.Row key={user.id}>
            <UBTable.Cell>{user.name}</UBTable.Cell>
            <UBTable.Cell>{user.email}</UBTable.Cell>
            <UBTable.Cell>{user.role}</UBTable.Cell>
            <UBTable.Cell>{user.status}</UBTable.Cell>
          </UBTable.Row>
        ))}
      </UBTable.Body>
    </UBTable>
  ),
};

export const WithCaption: Story = {
  args: {
    caption: 'User Management Table',
  },
  render: args => (
    <UBTable {...args}>
      <UBTable.Header>
        <UBTable.Row>
          <UBTable.HeaderCell>Name</UBTable.HeaderCell>
          <UBTable.HeaderCell>Email</UBTable.HeaderCell>
          <UBTable.HeaderCell>Role</UBTable.HeaderCell>
        </UBTable.Row>
      </UBTable.Header>
      <UBTable.Body>
        {sampleData.slice(0, 3).map(user => (
          <UBTable.Row key={user.id}>
            <UBTable.Cell>{user.name}</UBTable.Cell>
            <UBTable.Cell>{user.email}</UBTable.Cell>
            <UBTable.Cell>{user.role}</UBTable.Cell>
          </UBTable.Row>
        ))}
      </UBTable.Body>
    </UBTable>
  ),
};

export const Striped: Story = {
  args: {
    striped: true,
  },
  render: args => (
    <UBTable {...args}>
      <UBTable.Header>
        <UBTable.Row>
          <UBTable.HeaderCell>Name</UBTable.HeaderCell>
          <UBTable.HeaderCell>Email</UBTable.HeaderCell>
          <UBTable.HeaderCell>Status</UBTable.HeaderCell>
        </UBTable.Row>
      </UBTable.Header>
      <UBTable.Body>
        {sampleData.map(user => (
          <UBTable.Row key={user.id}>
            <UBTable.Cell>{user.name}</UBTable.Cell>
            <UBTable.Cell>{user.email}</UBTable.Cell>
            <UBTable.Cell>{user.status}</UBTable.Cell>
          </UBTable.Row>
        ))}
      </UBTable.Body>
    </UBTable>
  ),
};

export const WithSorting: Story = {
  render: args => (
    <UBTable {...args}>
      <UBTable.Header>
        <UBTable.Row>
          <UBTable.HeaderCell sortable sortDirection="asc" onSort={fn()}>
            Name
          </UBTable.HeaderCell>
          <UBTable.HeaderCell sortable sortDirection="none" onSort={fn()}>
            Email
          </UBTable.HeaderCell>
          <UBTable.HeaderCell sortable sortDirection="desc" onSort={fn()}>
            Role
          </UBTable.HeaderCell>
          <UBTable.HeaderCell>Status</UBTable.HeaderCell>
        </UBTable.Row>
      </UBTable.Header>
      <UBTable.Body>
        {sampleData.map(user => (
          <UBTable.Row key={user.id}>
            <UBTable.Cell>{user.name}</UBTable.Cell>
            <UBTable.Cell>{user.email}</UBTable.Cell>
            <UBTable.Cell>{user.role}</UBTable.Cell>
            <UBTable.Cell>{user.status}</UBTable.Cell>
          </UBTable.Row>
        ))}
      </UBTable.Body>
    </UBTable>
  ),
};

export const InteractiveSortable: Story = {
  render: args => {
    // Define types based on our sampleData to ensure type safety.
    type SortKey = keyof (typeof sampleData)[0];
    type SortDirection = 'asc' | 'desc';

    // State to manage the current sort column and direction.
    const [sortConfig, setSortConfig] = useState<{
      key: SortKey;
      direction: SortDirection;
    }>({ key: 'name', direction: 'asc' });

    // useMemo will re-sort the data only when the data or sortConfig changes.
    const sortedData = useMemo(() => {
      const sortableItems = [...sampleData]; // Create a mutable copy
      sortableItems.sort((a, b) => {
        // Type guard to ensure we're comparing valid keys
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
      return sortableItems;
    }, [sortConfig]);

    // This handler is called by UBTable.HeaderCell's onSort prop.
    const handleSort = (key: SortKey) => {
      let direction: SortDirection = 'asc';
      // If clicking the same column, toggle direction. Otherwise, default to ascending.
      if (sortConfig.key === key && sortConfig.direction === 'asc') {
        direction = 'desc';
      }
      setSortConfig({ key, direction });
    };

    const headers: { key: SortKey; label: string }[] = [
      { key: 'name', label: 'Name' },
      { key: 'email', label: 'Email' },
      { key: 'role', label: 'Role' },
      { key: 'status', label: 'Status' },
    ];

    return (
      <UBTable {...args}>
        <UBTable.Header>
          <UBTable.Row>
            {headers.map(({ key, label }) => (
              <UBTable.HeaderCell
                key={key}
                sortable
                onSort={() => handleSort(key)}
                // Pass the correct direction to the component
                sortDirection={sortConfig.key === key ? sortConfig.direction : 'none'}
              >
                {label}
              </UBTable.HeaderCell>
            ))}
          </UBTable.Row>
        </UBTable.Header>
        <UBTable.Body>
          {/* We map over the state-managed, sorted data */}
          {sortedData.map(user => (
            <UBTable.Row key={user.id}>
              <UBTable.Cell>{user.name}</UBTable.Cell>
              <UBTable.Cell>{user.email}</UBTable.Cell>
              <UBTable.Cell>{user.role}</UBTable.Cell>
              <UBTable.Cell>{user.status}</UBTable.Cell>
            </UBTable.Row>
          ))}
        </UBTable.Body>
      </UBTable>
    );
  },
};

export const WithNumericData: Story = {
  render: args => (
    <UBTable {...args}>
      <UBTable.Header>
        <UBTable.Row>
          <UBTable.HeaderCell>Product</UBTable.HeaderCell>
          <UBTable.HeaderCell>Price</UBTable.HeaderCell>
          <UBTable.HeaderCell>Quantity</UBTable.HeaderCell>
          <UBTable.HeaderCell>Total</UBTable.HeaderCell>
        </UBTable.Row>
      </UBTable.Header>
      <UBTable.Body>
        <UBTable.Row>
          <UBTable.Cell>Widget A</UBTable.Cell>
          <UBTable.Cell numeric>$19.99</UBTable.Cell>
          <UBTable.Cell numeric>2</UBTable.Cell>
          <UBTable.Cell numeric>$39.98</UBTable.Cell>
        </UBTable.Row>
        <UBTable.Row>
          <UBTable.Cell>Widget B</UBTable.Cell>
          <UBTable.Cell numeric>$29.99</UBTable.Cell>
          <UBTable.Cell numeric>1</UBTable.Cell>
          <UBTable.Cell numeric>$29.99</UBTable.Cell>
        </UBTable.Row>
        <UBTable.Row>
          <UBTable.Cell>Widget C</UBTable.Cell>
          <UBTable.Cell numeric>$9.99</UBTable.Cell>
          <UBTable.Cell numeric>5</UBTable.Cell>
          <UBTable.Cell numeric>$49.95</UBTable.Cell>
        </UBTable.Row>
      </UBTable.Body>
      <UBTable.Footer>
        <UBTable.Row>
          <UBTable.Cell>Total</UBTable.Cell>
          <UBTable.Cell></UBTable.Cell>
          <UBTable.Cell numeric>8</UBTable.Cell>
          <UBTable.Cell numeric>
            <strong>$119.92</strong>
          </UBTable.Cell>
        </UBTable.Row>
      </UBTable.Footer>
    </UBTable>
  ),
};

export const SelectableRows: Story = {
  render: args => (
    <UBTable {...args}>
      <UBTable.Header>
        <UBTable.Row>
          <UBTable.HeaderCell>Name</UBTable.HeaderCell>
          <UBTable.HeaderCell>Email</UBTable.HeaderCell>
          <UBTable.HeaderCell>Role</UBTable.HeaderCell>
        </UBTable.Row>
      </UBTable.Header>
      <UBTable.Body>
        <UBTable.Row clickable onClick={fn()}>
          <UBTable.Cell>John Doe</UBTable.Cell>
          <UBTable.Cell>john@example.com</UBTable.Cell>
          <UBTable.Cell>Admin</UBTable.Cell>
        </UBTable.Row>
        <UBTable.Row selected>
          <UBTable.Cell>Jane Smith</UBTable.Cell>
          <UBTable.Cell>jane@example.com</UBTable.Cell>
          <UBTable.Cell>User</UBTable.Cell>
        </UBTable.Row>
        <UBTable.Row clickable onClick={fn()}>
          <UBTable.Cell>Bob Wilson</UBTable.Cell>
          <UBTable.Cell>bob@example.com</UBTable.Cell>
          <UBTable.Cell>Editor</UBTable.Cell>
        </UBTable.Row>
      </UBTable.Body>
    </UBTable>
  ),
};

export const SizeVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h3>Small</h3>
        <UBTable size="sm">
          <UBTable.Header>
            <UBTable.Row>
              <UBTable.HeaderCell>Name</UBTable.HeaderCell>
              <UBTable.HeaderCell>Email</UBTable.HeaderCell>
            </UBTable.Row>
          </UBTable.Header>
          <UBTable.Body>
            <UBTable.Row>
              <UBTable.Cell>John Doe</UBTable.Cell>
              <UBTable.Cell>john@example.com</UBTable.Cell>
            </UBTable.Row>
          </UBTable.Body>
        </UBTable>
      </div>

      <div>
        <h3>Medium (Default)</h3>
        <UBTable size="md">
          <UBTable.Header>
            <UBTable.Row>
              <UBTable.HeaderCell>Name</UBTable.HeaderCell>
              <UBTable.HeaderCell>Email</UBTable.HeaderCell>
            </UBTable.Row>
          </UBTable.Header>
          <UBTable.Body>
            <UBTable.Row>
              <UBTable.Cell>John Doe</UBTable.Cell>
              <UBTable.Cell>john@example.com</UBTable.Cell>
            </UBTable.Row>
          </UBTable.Body>
        </UBTable>
      </div>

      <div>
        <h3>Large</h3>
        <UBTable size="lg">
          <UBTable.Header>
            <UBTable.Row>
              <UBTable.HeaderCell>Name</UBTable.HeaderCell>
              <UBTable.HeaderCell>Email</UBTable.HeaderCell>
            </UBTable.Row>
          </UBTable.Header>
          <UBTable.Body>
            <UBTable.Row>
              <UBTable.Cell>John Doe</UBTable.Cell>
              <UBTable.Cell>john@example.com</UBTable.Cell>
            </UBTable.Row>
          </UBTable.Body>
        </UBTable>
      </div>
    </div>
  ),
};
