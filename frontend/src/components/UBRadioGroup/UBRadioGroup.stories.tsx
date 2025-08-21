import type { Meta, StoryObj } from '@storybook/react-vite';
import UBRadioGroup from './UBRadioGroup';
import type { ComponentProps } from 'react';
import { useState } from 'react';

type UBRadioGroupProps = ComponentProps<typeof UBRadioGroup>;

const meta: Meta<UBRadioGroupProps> = {
  title: 'ToReview/UBRadioGroup',
  component: UBRadioGroup,
  argTypes: {
    value: { control: 'text' },
  },
};

export default meta;

type Story = StoryObj<UBRadioGroupProps>;

const StoryWrapper = (args: UBRadioGroupProps) => {
  const [value, setValue] = useState('second');
  return <UBRadioGroup {...args} value={value} onValueChange={setValue} />;
};

export const VerticalUseState: Story = {
  parameters: {
    controls: { disable: true },
  },
  args: {
    options: [
      { value: 'first', label: 'First' },
      { value: 'second', label: 'Second' },
      { value: 'third', label: 'Third' },
    ],
    direction: 'column',
  },
  render: args => <StoryWrapper {...args} />,
};

export const HorizontalUseState: Story = {
  parameters: {
    controls: { disable: true },
  },
  args: {
    options: [
      { value: 'first', label: 'First' },
      { value: 'second', label: 'Second' },
      { value: 'third', label: 'Third' },
    ],
    direction: 'row',
  },
  render: args => <StoryWrapper {...args} />,
};

export const VerticalDisabled: Story = {
  args: {
    options: [
      { value: 'first', label: 'First' },
      { value: 'second', label: 'Second' },
      { value: 'third', label: 'Third' },
    ],
    direction: 'column',
    disabled: true,
  },
  render: args => <StoryWrapper {...args} />,
};
