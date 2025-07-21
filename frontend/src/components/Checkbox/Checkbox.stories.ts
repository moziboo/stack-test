import type { Meta, StoryObj } from '@storybook/react-vite';
import CheckboxDemo from './Checkbox';

const checkboxMeta = {
  title: 'Checkbox',
  component: CheckboxDemo,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {},
  args: {},
} satisfies Meta<typeof CheckboxDemo>;

export default checkboxMeta;
type Story = StoryObj<typeof checkboxMeta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Unchecked: Story = {
  args: {},
};
