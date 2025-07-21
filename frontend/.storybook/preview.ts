import type { Preview } from '@storybook/react-vite';
import '../src/index.css'; // Import your main CSS file here

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    // Set centered layout as default for all stories
    layout: 'centered',
  },
};

export default preview;
