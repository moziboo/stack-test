import type { Meta, StoryObj } from '@storybook/react-vite';
import UBDivider from './UBDivider';

const meta: Meta<typeof UBDivider> = {
  title: 'UBDivider',
  component: UBDivider,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
    },
    variant: {
      control: 'select',
      options: ['solid', 'dashed', 'dotted'],
    },
    spacing: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg', 'xl'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof UBDivider>;

export const Default: Story = {
  args: {},
  render: args => (
    <div>
      <p>Content above the divider</p>
      <UBDivider {...args} />
      <p>Content below the divider</p>
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div>
      <h3>Solid Divider</h3>
      <UBDivider variant="solid" />

      <h3>Dashed Divider</h3>
      <UBDivider variant="dashed" />

      <h3>Dotted Divider</h3>
      <UBDivider variant="dotted" />
    </div>
  ),
};

export const AllSpacing: Story = {
  render: () => (
    <div>
      No spacing:
      <UBDivider spacing="none" />
      Small spacing:
      <UBDivider spacing="sm" />
      Medium spacing (default):
      <UBDivider spacing="md" />
      Large spacing:
      <UBDivider spacing="lg" />
      Extra large spacing:
      <UBDivider spacing="xl" />
    </div>
  ),
};

export const VerticalDivider: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', height: '100px', gap: '16px' }}>
      <div>
        <h3>Left content</h3>
      </div>
      <UBDivider orientation="vertical" />
      <div>
        <h3>Middle content</h3>
      </div>
      <UBDivider orientation="vertical" variant="dashed" />
      <div>
        <h3>Right content</h3>
      </div>
    </div>
  ),
};
