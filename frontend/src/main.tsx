import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';

// Start MSW in development mode
async function enableMocking() {
  if (import.meta.env.DEV) {
    const { worker } = await import('./test/mocks/browser');

    // `worker.start()` returns a Promise that resolves
    // once the Service Worker is up and ready to intercept requests.
    return worker.start({
      onUnhandledRequest: 'warn', // Warn about unhandled requests instead of erroring
    });
  }
}

enableMocking().then(() => {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
});
