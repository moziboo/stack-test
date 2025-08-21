import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import UBTag from './UBTag';
import UBCard from '../UBCard/UBCard';

const meta: Meta<typeof UBTag> = {
  title: 'ToReview/UBTag',
  component: UBTag,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'primary', 'secondary', 'success', 'warning', 'error', 'info'],
    },
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
    children: 'Default Tag',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
      <UBTag variant="default">Default</UBTag>
      <UBTag variant="primary">Primary</UBTag>
      <UBTag variant="secondary">Secondary</UBTag>
      <UBTag variant="success">Success</UBTag>
      <UBTag variant="warning">Warning</UBTag>
      <UBTag variant="error">Error</UBTag>
      <UBTag variant="info">Info</UBTag>
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
      <UBTag size="sm" variant="primary">
        Small
      </UBTag>
      <UBTag size="md" variant="primary">
        Medium
      </UBTag>
      <UBTag size="lg" variant="primary">
        Large
      </UBTag>
    </div>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
      <UBTag variant="success" icon="✓">
        Completed
      </UBTag>
      <UBTag variant="warning" icon="⚠">
        Pending
      </UBTag>
      <UBTag variant="error" icon="✕">
        Failed
      </UBTag>
      <UBTag variant="info" icon="ℹ">
        Information
      </UBTag>
      <UBTag variant="primary" icon="⭐">
        Featured
      </UBTag>
      <UBTag variant="secondary" icon="🏷">
        Category
      </UBTag>
    </div>
  ),
};

export const RemovableTags: Story = {
  render: () => {
    const [tags, setTags] = useState([
      { id: 1, label: 'React', variant: 'primary' as const },
      { id: 2, label: 'TypeScript', variant: 'info' as const },
      { id: 3, label: 'JavaScript', variant: 'warning' as const },
      { id: 4, label: 'Frontend', variant: 'success' as const },
      { id: 5, label: 'Web Development', variant: 'secondary' as const },
    ]);

    const removeTag = (id: number) => {
      setTags(prev => prev.filter(tag => tag.id !== id));
    };

    return (
      <div>
        <h3>Skills (Click × to remove)</h3>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '8px' }}>
          {tags.map(tag => (
            <UBTag key={tag.id} variant={tag.variant} removable onRemove={() => removeTag(tag.id)}>
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

export const OnCards: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gap: '16px',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      }}
    >
      <UBCard>
        <UBCard.Header>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3>Project Alpha</h3>
            <UBTag variant="success" size="sm">
              Active
            </UBTag>
          </div>
        </UBCard.Header>
        <UBCard.Body>
          <p>A revolutionary new application for managing tasks and productivity.</p>
          <div style={{ marginTop: '12px', display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            <UBTag size="sm" variant="primary">
              React
            </UBTag>
            <UBTag size="sm" variant="info">
              TypeScript
            </UBTag>
            <UBTag size="sm" variant="secondary">
              Frontend
            </UBTag>
          </div>
        </UBCard.Body>
      </UBCard>

      <UBCard>
        <UBCard.Header>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3>Project Beta</h3>
            <UBTag variant="warning" size="sm">
              In Review
            </UBTag>
          </div>
        </UBCard.Header>
        <UBCard.Body>
          <p>Backend services and API development for mobile applications.</p>
          <div style={{ marginTop: '12px', display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            <UBTag size="sm" variant="success">
              Node.js
            </UBTag>
            <UBTag size="sm" variant="primary">
              Express
            </UBTag>
            <UBTag size="sm" variant="secondary">
              Backend
            </UBTag>
            <UBTag size="sm" variant="info">
              API
            </UBTag>
          </div>
        </UBCard.Body>
      </UBCard>

      <UBCard>
        <UBCard.Header>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3>Project Gamma</h3>
            <UBTag variant="error" size="sm">
              Blocked
            </UBTag>
          </div>
        </UBCard.Header>
        <UBCard.Body>
          <p>Machine learning pipeline for data analysis and predictions.</p>
          <div style={{ marginTop: '12px', display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            <UBTag size="sm" variant="warning">
              Python
            </UBTag>
            <UBTag size="sm" variant="info">
              TensorFlow
            </UBTag>
            <UBTag size="sm" variant="secondary">
              ML
            </UBTag>
          </div>
        </UBCard.Body>
      </UBCard>
    </div>
  ),
};

export const CategoryFilters: Story = {
  render: () => {
    const [selectedCategories, setSelectedCategories] = useState(['frontend', 'react']);
    const categories = [
      { id: 'frontend', label: 'Frontend', variant: 'primary' as const },
      { id: 'backend', label: 'Backend', variant: 'success' as const },
      { id: 'react', label: 'React', variant: 'info' as const },
      { id: 'nodejs', label: 'Node.js', variant: 'warning' as const },
      { id: 'typescript', label: 'TypeScript', variant: 'secondary' as const },
      { id: 'database', label: 'Database', variant: 'error' as const },
    ];

    const toggleCategory = (categoryId: string) => {
      setSelectedCategories(prev =>
        prev.includes(categoryId) ? prev.filter(id => id !== categoryId) : [...prev, categoryId]
      );
    };

    return (
      <div>
        <h3>Filter by Technology</h3>
        <p style={{ color: '#666', marginBottom: '16px' }}>Click tags to filter content</p>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {categories.map(category => (
            <UBTag
              key={category.id}
              variant={selectedCategories.includes(category.id) ? category.variant : 'default'}
              style={{ cursor: 'pointer' }}
              onClick={() => toggleCategory(category.id)}
            >
              {category.label}
            </UBTag>
          ))}
        </div>
        <div
          style={{
            marginTop: '16px',
            padding: '12px',
            backgroundColor: '#f8f9fa',
            borderRadius: '6px',
          }}
        >
          <strong>Selected filters:</strong>{' '}
          {selectedCategories.length > 0 ? selectedCategories.join(', ') : 'None'}
        </div>
      </div>
    );
  },
};

export const StatusIndicators: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        <span>System Status:</span>
        <UBTag variant="success" icon="●">
          Online
        </UBTag>
      </div>
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        <span>Build Status:</span>
        <UBTag variant="warning" icon="●">
          Building
        </UBTag>
      </div>
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        <span>Database:</span>
        <UBTag variant="error" icon="●">
          Offline
        </UBTag>
      </div>
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        <span>API Health:</span>
        <UBTag variant="info" icon="●">
          Monitoring
        </UBTag>
      </div>
    </div>
  ),
};

export const LongContent: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <UBTag>Short tag</UBTag>
      <UBTag>This is a medium length tag name</UBTag>
      <UBTag>This is a very long tag name that should truncate gracefully with ellipsis</UBTag>
      <UBTag size="sm">Small tag with very long content that gets truncated</UBTag>
      <UBTag size="lg">Large tag with somewhat longer content that fits better</UBTag>
    </div>
  ),
};
