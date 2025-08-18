import { UsersExample } from './UsersExample';

const TabButton = ({
  isActive,
  onClick,
  children,
}: {
  isActive: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) => (
  <button
    onClick={onClick}
    style={{
      padding: '12px 24px',
      border: 'none',
      backgroundColor: isActive ? '#007bff' : '#f8f9fa',
      color: isActive ? 'white' : '#333',
      cursor: 'pointer',
      borderRadius: '4px 4px 0 0',
      marginRight: '4px',
      fontSize: '16px',
      fontWeight: isActive ? 'bold' : 'normal',
    }}
  >
    {children}
  </button>
);

const ApiExamplesContent = () => {
  // Simplified to only show users since posts were removed

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      {/* Header */}
      <header
        style={{
          backgroundColor: 'white',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          padding: '20px 0',
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
          <h1 style={{ margin: 0, color: '#333' }}>🚀 Simple API Client</h1>
          <p style={{ margin: '10px 0 0 0', color: '#666' }}>
            Basic API client examples using fetch and React state
          </p>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav
        style={{
          backgroundColor: 'white',
          borderBottom: '1px solid #ddd',
          padding: '0 20px',
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <TabButton isActive={true} onClick={() => {}}>
            👥 Users API (Queries)
          </TabButton>
        </div>
      </nav>

      {/* Content */}
      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
        <UsersExample />
      </main>

      {/* Footer with Implementation Notes */}
      <footer
        style={{
          backgroundColor: 'white',
          marginTop: '40px',
          padding: '30px 20px',
          borderTop: '1px solid #ddd',
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h3>📚 Implementation Overview</h3>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '20px',
            }}
          >
            <div style={{ background: '#f8f9fa', padding: '15px', borderRadius: '8px' }}>
              <h4>🎯 Simple Approach</h4>
              <ul style={{ fontSize: '14px', lineHeight: '1.5' }}>
                <li>Direct fetch API usage</li>
                <li>Basic TypeScript interfaces</li>
                <li>Manual state management with useState</li>
                <li>Simple error handling</li>
              </ul>
            </div>

            <div style={{ background: '#f8f9fa', padding: '15px', borderRadius: '8px' }}>
              <h4>⚡ Features</h4>
              <ul style={{ fontSize: '14px', lineHeight: '1.5' }}>
                <li>Lightweight - no external dependencies</li>
                <li>Easy to understand and modify</li>
                <li>Manual loading and error states</li>
                <li>Basic search debouncing</li>
              </ul>
            </div>

            <div style={{ background: '#f8f9fa', padding: '15px', borderRadius: '8px' }}>
              <h4>🔧 Setup Required</h4>
              <ul style={{ fontSize: '14px', lineHeight: '1.5' }}>
                <li>No additional dependencies needed</li>
                <li>Define TypeScript types</li>
                <li>Create API client functions</li>
                <li>Build custom hooks with useState</li>
              </ul>
            </div>
          </div>

          <div
            style={{
              marginTop: '20px',
              padding: '15px',
              background: '#e8f5e8',
              borderRadius: '8px',
            }}
          >
            <h4>✨ File Structure:</h4>
            <pre style={{ fontSize: '12px', margin: 0, lineHeight: '1.4' }}>
              {`src/
├── api/apiClient.ts         # Simple API client with fetch
├── hooks/api.ts             # Custom hooks with useState
└── examples/
    ├── ApiExamplesApp.tsx   # This demo app
    └── UsersExample.tsx     # User API examples`}
            </pre>
          </div>
        </div>
      </footer>
    </div>
  );
};

// Main App Component (no provider needed)
export const ApiExamplesApp = () => {
  return <ApiExamplesContent />;
};

export default ApiExamplesApp;
