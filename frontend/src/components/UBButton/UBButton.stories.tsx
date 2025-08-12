import type { Meta, StoryObj } from '@storybook/react-vite';
import UBButton from './UBButton';

const meta: Meta<typeof UBButton> = {
  title: 'UtilityBelt/UBButton',
  component: UBButton,
};

export default meta;

type Story = StoryObj<typeof UBButton>;

export const Default: Story = {
  args: {
    label: 'Submit',
  },
  render: args => <UBButton {...args} />,
};
