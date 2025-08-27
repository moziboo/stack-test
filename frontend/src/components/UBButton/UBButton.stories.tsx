import type { Meta, StoryObj } from '@storybook/react-vite';
import UBButton from './UBButton';
import { Label } from 'radix-ui';
import { fn } from 'storybook/test';

const meta: Meta<typeof UBButton> = {
  title: 'UBButton',
  component: UBButton,
  args: {
    label: 'Submit',
    onClick: fn(),
  },
};

export default meta;

type Story = StoryObj<typeof UBButton>;

export const Default: Story = {
  render: args => <UBButton {...args} />,
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
  render: args => <UBButton {...args} />,
};

export const WithLabelChildren: Story = {
  render: args => (
    <UBButton {...args}>
      <Label.Root>Submit</Label.Root>
    </UBButton>
  ),
};
