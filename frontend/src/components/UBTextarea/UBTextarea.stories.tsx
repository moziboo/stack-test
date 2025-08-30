import type { Meta, StoryObj } from '@storybook/react-vite';
import UBTextarea from './UBTextarea';
import type { ComponentProps } from 'react';
import { fn } from 'storybook/test';
import { useState } from 'react';

type UBTextareaProps = ComponentProps<typeof UBTextarea>;

const meta: Meta<UBTextareaProps> = {
  title: 'ToReview/UBTextarea',
  component: UBTextarea,
  argTypes: {
    label: { control: 'text' },
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
    readOnly: { control: 'boolean' },
    resize: { control: 'select', options: ['none', 'both', 'horizontal', 'vertical'] },
    rows: { control: 'number' },
    onChange: { action: 'changed' },
  },
  args: {
    label: 'Message',
    placeholder: 'Enter your message here...',
    disabled: false,
    readOnly: false,
    resize: 'vertical',
    rows: 4,
    onChange: fn(),
  },
};

export default meta;

type Story = StoryObj<UBTextareaProps>;

export const Default: Story = {
  render: args => {
    const [value, setValue] = useState('');

    return <UBTextarea {...args} value={value} onChange={e => setValue(e.target.value)} />;
  },
};

export const WithoutLabel: Story = {
  args: {
    label: undefined,
  },
  render: args => {
    const [value, setValue] = useState('');

    return <UBTextarea {...args} value={value} onChange={e => setValue(e.target.value)} />;
  },
};

export const WithInitialValue: Story = {
  render: args => {
    const [value, setValue] = useState(
      'This textarea has some initial content.\n\nYou can edit this text.'
    );

    return <UBTextarea {...args} value={value} onChange={e => setValue(e.target.value)} />;
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
  render: args => {
    const [value, setValue] = useState('This textarea is disabled and cannot be edited.');

    return <UBTextarea {...args} value={value} onChange={e => setValue(e.target.value)} />;
  },
};

export const ReadOnly: Story = {
  args: {
    readOnly: true,
    label: 'Read-only Content',
  },
  render: args => {
    const [value, setValue] = useState(
      'This textarea is read-only. You can select the text but cannot edit it.'
    );

    return <UBTextarea {...args} value={value} onChange={e => setValue(e.target.value)} />;
  },
};

export const ResizeOptions: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
      <div>
        <h3>No Resize</h3>
        <UBTextarea
          label="No Resize"
          resize="none"
          placeholder="Cannot be resized"
          defaultValue="This textarea cannot be resized."
        />
      </div>

      <div>
        <h3>Horizontal Resize</h3>
        <UBTextarea
          label="Horizontal Resize"
          resize="horizontal"
          placeholder="Can be resized horizontally"
          defaultValue="This textarea can be resized horizontally only."
        />
      </div>

      <div>
        <h3>Vertical Resize (Default)</h3>
        <UBTextarea
          label="Vertical Resize"
          resize="vertical"
          placeholder="Can be resized vertically"
          defaultValue="This textarea can be resized vertically only."
        />
      </div>

      <div>
        <h3>Both Directions</h3>
        <UBTextarea
          label="Both Directions"
          resize="both"
          placeholder="Can be resized in both directions"
          defaultValue="This textarea can be resized in both directions."
        />
      </div>
    </div>
  ),
};

export const DifferentSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h3>Small (2 rows)</h3>
        <UBTextarea label="Small Textarea" rows={2} placeholder="Small textarea with 2 rows" />
      </div>

      <div>
        <h3>Medium (4 rows - default)</h3>
        <UBTextarea label="Medium Textarea" rows={4} placeholder="Medium textarea with 4 rows" />
      </div>

      <div>
        <h3>Large (8 rows)</h3>
        <UBTextarea label="Large Textarea" rows={8} placeholder="Large textarea with 8 rows" />
      </div>
    </div>
  ),
};

export const WithCharacterCount: Story = {
  render: args => {
    const [value, setValue] = useState('');
    const maxLength = 200;

    return (
      <div>
        <UBTextarea
          {...args}
          value={value}
          onChange={e => setValue(e.target.value)}
          maxLength={maxLength}
          label="Message with character limit"
          placeholder="Type your message (max 200 characters)"
        />
        <div
          style={{
            fontSize: 'var(--font-size-sm)',
            color: 'var(--color-text-secondary)',
            marginTop: 'var(--spacing-xs)',
            textAlign: 'right',
          }}
        >
          {value.length}/{maxLength}
        </div>
      </div>
    );
  },
};
