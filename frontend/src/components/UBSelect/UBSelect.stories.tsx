import type { Meta, StoryObj } from '@storybook/react-vite';
import UBSelect from './UBSelect';
import type { ComponentProps } from 'react';
import { fn } from 'storybook/test';
import { useState } from 'react';

type UBSelectProps = ComponentProps<typeof UBSelect>;

const sampleOptions = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry' },
  { value: 'date', label: 'Date' },
  { value: 'elderberry', label: 'Elderberry', disabled: true },
  { value: 'fig', label: 'Fig' },
];

const countryOptions = [
  { value: 'us', label: 'United States' },
  { value: 'ca', label: 'Canada' },
  { value: 'uk', label: 'United Kingdom' },
  { value: 'de', label: 'Germany' },
  { value: 'fr', label: 'France' },
  { value: 'jp', label: 'Japan' },
  { value: 'au', label: 'Australia' },
];

const meta: Meta<UBSelectProps> = {
  title: 'UtilityBelt/UBSelect',
  component: UBSelect,
  argTypes: {
    label: { control: 'text' },
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
    required: { control: 'boolean' },
    onValueChange: { action: 'valueChanged' },
  },
  args: {
    options: sampleOptions,
    label: 'Choose a fruit',
    placeholder: 'Select a fruit...',
    disabled: false,
    required: false,
    onValueChange: fn(),
  },
};

export default meta;

type Story = StoryObj<UBSelectProps>;

export const Default: Story = {
  render: args => {
    const [value, setValue] = useState<string>('');

    return <UBSelect {...args} value={value} onValueChange={setValue} />;
  },
};

export const WithoutLabel: Story = {
  args: {
    label: undefined,
  },
  render: args => {
    const [value, setValue] = useState<string>('');

    return <UBSelect {...args} value={value} onValueChange={setValue} />;
  },
};

export const WithPreselectedValue: Story = {
  render: args => {
    const [value, setValue] = useState<string>('banana');

    return <UBSelect {...args} value={value} onValueChange={setValue} />;
  },
};

export const Required: Story = {
  args: {
    required: true,
    label: 'Required Selection',
  },
  render: args => {
    const [value, setValue] = useState<string>('');

    return <UBSelect {...args} value={value} onValueChange={setValue} />;
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
  render: args => {
    const [value, setValue] = useState<string>('apple');

    return <UBSelect {...args} value={value} onValueChange={setValue} />;
  },
};

export const CountrySelector: Story = {
  args: {
    options: countryOptions,
    label: 'Country',
    placeholder: 'Select your country...',
  },
  render: args => {
    const [value, setValue] = useState<string>('');

    return <UBSelect {...args} value={value} onValueChange={setValue} />;
  },
};

export const WithDisabledOptions: Story = {
  args: {
    options: [
      { value: 'option1', label: 'Available Option 1' },
      { value: 'option2', label: 'Disabled Option', disabled: true },
      { value: 'option3', label: 'Available Option 2' },
      { value: 'option4', label: 'Another Disabled Option', disabled: true },
      { value: 'option5', label: 'Available Option 3' },
    ],
    label: 'Select with disabled options',
  },
  render: args => {
    const [value, setValue] = useState<string>('');

    return <UBSelect {...args} value={value} onValueChange={setValue} />;
  },
};

export const LongOptionsList: Story = {
  args: {
    options: Array.from({ length: 20 }, (_, i) => ({
      value: `option-${i + 1}`,
      label: `Option ${i + 1}`,
    })),
    label: 'Select with many options',
    placeholder: 'Choose from many options...',
  },
  render: args => {
    const [value, setValue] = useState<string>('');

    return <UBSelect {...args} value={value} onValueChange={setValue} />;
  },
};

export const WithoutLabelForRadixForm: Story = {
  args: {
    label: undefined,
    placeholder: 'Used with Radix Form...',
  },
  parameters: {
    docs: {
      description: {
        story:
          'This version renders just the select element, perfect for use with Radix Form.Control asChild.',
      },
    },
  },
  render: args => {
    const [value, setValue] = useState<string>('');

    return <UBSelect {...args} value={value} onValueChange={setValue} />;
  },
};
