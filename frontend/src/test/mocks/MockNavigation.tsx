import type { FC, ReactNode } from 'react';

// Mock version of a Navigation component for testing
// This simplifies testing by removing complex behaviors
// that might be in the real Navigation component

interface MockNavigationProps {
  children?: ReactNode;
  currentPath?: string;
  onNavigate?: (path: string) => void;
}

const MockNavigation: FC<MockNavigationProps> = ({
  children,
  currentPath = '/',
  onNavigate = () => {},
}) => {
  return (
    <nav data-testid="mock-navigation" data-current-path={currentPath}>
      <ul>
        <li>
          <button onClick={() => onNavigate('/')}>Home</button>
        </li>
        <li>
          <button onClick={() => onNavigate('/about')}>About</button>
        </li>
        <li>
          <button onClick={() => onNavigate('/contact')}>Contact</button>
        </li>
        {children}
      </ul>
    </nav>
  );
};

export default MockNavigation;
