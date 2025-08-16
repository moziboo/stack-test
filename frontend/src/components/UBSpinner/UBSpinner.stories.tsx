import type { Meta, StoryObj } from '@storybook/react-vite';
import UBSpinner from './UBSpinner';

const meta: Meta<typeof UBSpinner> = {
  title: 'UBSpinner',
  component: UBSpinner,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
    },
    variant: {
      control: 'select',
      options: ['default', 'primary', 'secondary'],
    },
    speed: {
      control: 'select',
      options: ['slow', 'normal', 'fast'],
    },
    showLabel: {
      control: 'boolean',
    },
    label: {
      control: 'text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof UBSpinner>;

export const Default: Story = {
  args: {},
};

export const WithLabel: Story = {
  args: {
    showLabel: true,
    label: 'Loading content...',
  },
};

export const Small: Story = {
  args: {
    size: 'sm',
    showLabel: true,
    label: 'Loading...',
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
    showLabel: true,
    label: 'Loading...',
  },
};

export const ExtraLarge: Story = {
  args: {
    size: 'xl',
    showLabel: true,
    label: 'Loading application...',
  },
};

export const Primary: Story = {
  args: {
    variant: 'primary',
    size: 'lg',
    showLabel: true,
    label: 'Loading...',
  },
};

export const FastSpin: Story = {
  args: {
    speed: 'fast',
    size: 'md',
    showLabel: true,
    label: 'Fast loading...',
  },
};

export const SlowSpin: Story = {
  args: {
    speed: 'slow',
    size: 'md',
    showLabel: true,
    label: 'Slow loading...',
  },
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
      <div style={{ textAlign: 'center' }}>
        <UBSpinner size="sm" showLabel label="Small" />
      </div>
      <div style={{ textAlign: 'center' }}>
        <UBSpinner size="md" showLabel label="Medium" />
      </div>
      <div style={{ textAlign: 'center' }}>
        <UBSpinner size="lg" showLabel label="Large" />
      </div>
      <div style={{ textAlign: 'center' }}>
        <UBSpinner size="xl" showLabel label="Extra Large" />
      </div>
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
      <div style={{ textAlign: 'center' }}>
        <UBSpinner variant="default" size="lg" showLabel label="Default" />
      </div>
      <div style={{ textAlign: 'center' }}>
        <UBSpinner variant="primary" size="lg" showLabel label="Primary" />
      </div>
      <div style={{ textAlign: 'center' }}>
        <UBSpinner variant="secondary" size="lg" showLabel label="Secondary" />
      </div>
    </div>
  ),
};

export const AllSpeeds: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
      <div style={{ textAlign: 'center' }}>
        <UBSpinner speed="slow" size="lg" showLabel label="Slow" />
      </div>
      <div style={{ textAlign: 'center' }}>
        <UBSpinner speed="normal" size="lg" showLabel label="Normal" />
      </div>
      <div style={{ textAlign: 'center' }}>
        <UBSpinner speed="fast" size="lg" showLabel label="Fast" />
      </div>
    </div>
  ),
};

export const InlineUsage: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <span>Please wait</span>
      <UBSpinner size="sm" />
      <span>while we process your request...</span>
    </div>
  ),
};
