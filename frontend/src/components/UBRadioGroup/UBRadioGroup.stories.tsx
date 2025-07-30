import type { Meta, StoryObj } from '@storybook/react-vite';
import UBRadioGroup from './UBRadioGroup';
import type { ComponentProps } from 'react';
import { useState } from 'react';

type UBRadioGroupProps = ComponentProps<typeof UBRadioGroup>;

const meta: Meta<UBRadioGroupProps> = {
  title: 'UBRadioGroup',
  component: UBRadioGroup,
  argTypes: {
    defaultValue: { control: 'text' },
  },
};

export default meta;

type Story = StoryObj<UBRadioGroupProps>;

const StoryWrapper = (args: UBRadioGroupProps) => {
  const [value, setValue] = useState('first');
  return <UBRadioGroup {...args} value={value} onValueChange={setValue} />;
};

export const DemoVertical: Story = {
  parameters: {
    controls: { disable: true },
  },
  args: {
    value: 'first',
    options: [
      { value: 'first', label: 'First' },
      { value: 'second', label: 'Second' },
      { value: 'third', label: 'Third' },
    ],
    direction: 'column',
  },
  render: args => <StoryWrapper {...args} />,
};

export const DemoHorizontal: Story = {
  parameters: {
    controls: { disable: true },
  },
  args: {
    value: 'first',
    options: [
      { value: 'first', label: 'First' },
      { value: 'second', label: 'Second' },
      { value: 'third', label: 'Third' },
    ],
    direction: 'row',
  },
  render: args => <StoryWrapper {...args} />,
};
