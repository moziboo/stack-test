import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import UBSelect from './UBSelect';
import type { SelectOption } from './UBSelect';

const meta: Meta<typeof UBSelect> = {
  title: 'Components/UBSelect',
  component: UBSelect,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A styled select dropdown component that integrates with the UB design system.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    disabled: {
      control: 'boolean',
    },
    error: {
      control: 'text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof UBSelect>;

const countryOptions: SelectOption[] = [
  { label: 'United States', value: 'us' },
  { label: 'Canada', value: 'ca' },
  { label: 'United Kingdom', value: 'uk' },
  { label: 'Germany', value: 'de' },
  { label: 'France', value: 'fr' },
  { label: 'Japan', value: 'jp' },
  { label: 'Australia', value: 'au' },
];

const priorityOptions: SelectOption[] = [
  { label: 'Low', value: 'low' },
  { label: 'Medium', value: 'medium' },
  { label: 'High', value: 'high' },
  { label: 'Urgent', value: 'urgent' },
];

// Default select
export const Default: Story = {
  args: {
    label: 'Country',
    options: countryOptions,
    placeholder: 'Select a country',
  },
};

// Without label
export const WithoutLabel: Story = {
  args: {
    options: countryOptions,
    placeholder: 'Choose an option',
  },
};

// With error state
export const WithError: Story = {
  args: {
    label: 'Priority',
    options: priorityOptions,
    placeholder: 'Select priority',
    error: 'This field is required',
  },
};

// Disabled state
export const Disabled: Story = {
  args: {
    label: 'Country',
    options: countryOptions,
    placeholder: 'Select a country',
    disabled: true,
  },
};

// Interactive example with state
export const Interactive: Story = {
  render: () => {
    const [selectedCountry, setSelectedCountry] = useState('');
    const [selectedPriority, setSelectedPriority] = useState('');

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24, minWidth: 300 }}>
        <UBSelect
          label="Country"
          options={countryOptions}
          placeholder="Select your country"
          value={selectedCountry}
          onChange={e => setSelectedCountry(e.target.value)}
        />

        <UBSelect
          label="Priority Level"
          options={priorityOptions}
          placeholder="Select priority"
          value={selectedPriority}
          onChange={e => setSelectedPriority(e.target.value)}
        />

        {(selectedCountry || selectedPriority) && (
          <div style={{ padding: 16, backgroundColor: '#f8f9fa', borderRadius: 4 }}>
            <h4>Selected Values:</h4>
            {selectedCountry && (
              <p>Country: {countryOptions.find(c => c.value === selectedCountry)?.label}</p>
            )}
            {selectedPriority && (
              <p>Priority: {priorityOptions.find(p => p.value === selectedPriority)?.label}</p>
            )}
          </div>
        )}
      </div>
    );
  },
};

// Large options list
export const ManyOptions: Story = {
  args: {
    label: 'State/Province',
    options: [
      { label: 'Alabama', value: 'AL' },
      { label: 'Alaska', value: 'AK' },
      { label: 'Arizona', value: 'AZ' },
      { label: 'Arkansas', value: 'AR' },
      { label: 'California', value: 'CA' },
      { label: 'Colorado', value: 'CO' },
      { label: 'Connecticut', value: 'CT' },
      { label: 'Delaware', value: 'DE' },
      { label: 'Florida', value: 'FL' },
      { label: 'Georgia', value: 'GA' },
      // ... more states would go here
    ],
    placeholder: 'Select a state',
  },
};
