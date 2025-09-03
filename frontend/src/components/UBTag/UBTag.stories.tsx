import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import UBTag from './UBTag';

const meta: Meta<typeof UBTag> = {
  title: 'UBTag',
  component: UBTag,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    removable: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof UBTag>;

export const Default: Story = {
  args: {
    children: 'Default',
  },
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
      <UBTag size="sm">Small</UBTag>
      <UBTag size="md">Medium</UBTag>
      <UBTag size="lg">Large</UBTag>
    </div>
  ),
};

export const RemovableTags: Story = {
  render: () => {
    const [tags, setTags] = useState([
      { id: 1, label: 'React' as const },
      { id: 2, label: 'TypeScript' as const },
      { id: 3, label: 'JavaScript' as const },
      { id: 4, label: 'Frontend' as const },
      { id: 5, label: 'Web Development' as const },
    ]);

    const removeTag = (id: number) => {
      setTags(prev => prev.filter(tag => tag.id !== id));
    };

    return (
      <div>
        <h3>Click × to remove</h3>
        <div style={{ display: 'flex', gap: '2px', flexWrap: 'wrap', marginTop: '8px' }}>
          {tags.map(tag => (
            <UBTag key={tag.id} removable onRemove={() => removeTag(tag.id)}>
              {tag.label}
            </UBTag>
          ))}
        </div>
        {tags.length === 0 && (
          <p style={{ color: '#666', fontStyle: 'italic', marginTop: '16px' }}>
            All tags removed! Refresh to reset.
          </p>
        )}
      </div>
    );
  },
};
