import type { Preview } from '@storybook/react-vite'

// .storybook/preview.ts
// Add global decorators or parameters here if needed

export const parameters = {
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/i,
    },
  },
};

// import '../src/App.module.css'; // Example: import global CSS module if needed
