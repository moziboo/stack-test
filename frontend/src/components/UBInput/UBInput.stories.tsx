import type { Meta, StoryObj } from '@storybook/react-vite';
import UBInput from './UBInput';
import type { ComponentProps } from 'react';
import { useState } from 'react';
import { fn } from 'storybook/test';

type UBInputProps = ComponentProps<typeof UBInput>;

const meta: Meta<UBInputProps> = {
  title: 'UBInput',
  component: UBInput,
  argTypes: {
    label: { control: 'text' },
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'tel', 'url', 'search'],
    },
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
    required: { control: 'boolean' },
    readOnly: { control: 'boolean' },
    onChange: { action: 'value changed' },
  },
  args: {
    label: 'Username',
    type: 'text',
    placeholder: 'Enter your username',
    disabled: false,
    required: false,
    readOnly: false,
    onChange: fn(),
  },
};

export default meta;

type Story = StoryObj<UBInputProps>;

export const Default: Story = {
  render: args => <UBInput {...args} />,
};

export const WithoutLabel: Story = {
  args: {
    label: undefined,
    placeholder: 'Username',
  },
  render: args => <UBInput {...args} />,
};

export const Email: Story = {
  args: {
    label: 'Email Address',
    type: 'email',
    placeholder: 'user@example.com',
  },
  render: args => <UBInput {...args} />,
};

export const Password: Story = {
  args: {
    label: 'Password',
    type: 'password',
    placeholder: 'Enter your password',
  },
  render: args => <UBInput {...args} />,
};

export const Required: Story = {
  args: {
    label: 'Full Name',
    required: true,
    placeholder: 'John Doe',
  },
  render: args => <UBInput {...args} />,
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Input',
    disabled: true,
    value: 'This field is disabled',
  },
  render: args => <UBInput {...args} />,
};

export const ReadOnly: Story = {
  args: {
    label: 'Read Only',
    readOnly: true,
    value: 'This value cannot be changed',
  },
  render: args => <UBInput {...args} />,
};

const ControlledStoryWrapper = (args: UBInputProps) => {
  const [value, setValue] = useState('');
  return <UBInput {...args} value={value} onChange={e => setValue(e.target.value)} />;
};

export const Controlled: Story = {
  args: {
    label: 'Controlled Input',
    placeholder: 'Type something...',
  },
  parameters: {
    controls: { disable: true },
  },
  render: args => <ControlledStoryWrapper {...args} />,
};

export const WithValidation: Story = {
  args: {
    label: 'Phone Number',
    type: 'tel',
    pattern: '[0-9]{3}-[0-9]{3}-[0-9]{4}',
    placeholder: '123-456-7890',
    required: true,
  },
  render: args => <UBInput {...args} />,
};
