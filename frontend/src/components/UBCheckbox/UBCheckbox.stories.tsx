import type { Meta, StoryObj } from '@storybook/react-vite';
import UBCheckbox from './UBCheckbox';
import type { ComponentProps } from 'react';
import { useState } from 'react';
import { fn } from 'storybook/test';

type UBCheckboxProps = ComponentProps<typeof UBCheckbox>;

const meta: Meta<UBCheckboxProps> = {
  title: 'UBCheckbox',
  component: UBCheckbox,
  argTypes: {
    checked: { control: 'boolean' },
    label: { control: 'text' },
    onCheckedChange: { action: 'checked changed' },
  },
  args: {
    checked: false,
    label: 'Accept terms and conditions',
    onCheckedChange: fn(),
  },
};

export default meta;

type Story = StoryObj<UBCheckboxProps>;

export const CheckedWithLabel: Story = {
  args: {
    checked: true,
  },
  render: args => <UBCheckbox {...args} />,
};

export const CheckedWithLabelDisabled: Story = {
  args: {
    checked: true,
    disabled: true,
  },
  render: args => <UBCheckbox {...args} />,
};

export const UncheckedWithLabel: Story = {
  render: args => <UBCheckbox {...args} />,
};

export const CheckedWithoutLabel: Story = {
  args: {
    checked: true,
    label: '',
  },
  render: args => <UBCheckbox {...args} />,
};

const StoryWrapper = (args: UBCheckboxProps) => {
  const [checked, setChecked] = useState(true);
  return <UBCheckbox {...args} checked={checked} onCheckedChange={setChecked} />;
};

export const Demo: Story = {
  args: {
    label: 'Click around',
  },
  parameters: {
    controls: { disable: true },
  },
  render: args => <StoryWrapper {...args} />,
};
