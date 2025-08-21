import type { Meta, StoryObj } from '@storybook/react-vite';
import UBDivider from './UBDivider';
import UBCard from '../UBCard/UBCard';

const meta: Meta<typeof UBDivider> = {
  title: 'ToReview/UBDivider',
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
    labelPosition: {
      control: 'select',
      options: ['left', 'center', 'right'],
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

export const WithLabel: Story = {
  args: {
    label: 'Section Break',
  },
  render: args => (
    <div>
      <p>First section content goes here with some sample text.</p>
      <UBDivider {...args} />
      <p>Second section content continues after the labeled divider.</p>
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
      <p>Content before</p>
      <strong>No spacing:</strong>
      <UBDivider spacing="none" />
      <p>Content after</p>

      <p>Content before</p>
      <strong>Small spacing:</strong>
      <UBDivider spacing="sm" />
      <p>Content after</p>

      <p>Content before</p>
      <strong>Medium spacing (default):</strong>
      <UBDivider spacing="md" />
      <p>Content after</p>

      <p>Content before</p>
      <strong>Large spacing:</strong>
      <UBDivider spacing="lg" />
      <p>Content after</p>

      <p>Content before</p>
      <strong>Extra large spacing:</strong>
      <UBDivider spacing="xl" />
      <p>Content after</p>
    </div>
  ),
};

export const LabelPositions: Story = {
  render: () => (
    <div>
      <p>Content above</p>
      <UBDivider label="Left aligned" labelPosition="left" />
      <p>More content</p>

      <UBDivider label="Center aligned" labelPosition="center" />
      <p>More content</p>

      <UBDivider label="Right aligned" labelPosition="right" />
      <p>Content below</p>
    </div>
  ),
};

export const VerticalDivider: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', height: '100px', gap: '16px' }}>
      <div>Left content</div>
      <UBDivider orientation="vertical" />
      <div>Middle content</div>
      <UBDivider orientation="vertical" variant="dashed" />
      <div>Right content</div>
    </div>
  ),
};

export const InCards: Story = {
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
          <h3>User Profile</h3>
        </UBCard.Header>
        <UBCard.Body>
          <p>
            <strong>Name:</strong> John Doe
          </p>
          <p>
            <strong>Email:</strong> john@example.com
          </p>

          <UBDivider label="Contact Information" spacing="md" />

          <p>
            <strong>Phone:</strong> (555) 123-4567
          </p>
          <p>
            <strong>Address:</strong> 123 Main St
          </p>

          <UBDivider spacing="md" />

          <p>
            <strong>Member since:</strong> January 2023
          </p>
          <p>
            <strong>Status:</strong> Active
          </p>
        </UBCard.Body>
      </UBCard>

      <UBCard>
        <UBCard.Header>
          <h3>Settings</h3>
        </UBCard.Header>
        <UBCard.Body>
          <h4>Account Settings</h4>
          <p>Configure your account preferences</p>

          <UBDivider variant="dashed" label="Privacy" />

          <h4>Privacy Settings</h4>
          <p>Manage your privacy and data settings</p>

          <UBDivider variant="dotted" label="Security" />

          <h4>Security Settings</h4>
          <p>Update passwords and security options</p>
        </UBCard.Body>
      </UBCard>
    </div>
  ),
};

export const FormSections: Story = {
  render: () => (
    <UBCard>
      <UBCard.Header>
        <h3>Registration Form</h3>
      </UBCard.Header>
      <UBCard.Body>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <h4>Personal Information</h4>
          <input
            placeholder="First Name"
            style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
          />
          <input
            placeholder="Last Name"
            style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
          />

          <UBDivider label="Contact Details" spacing="lg" />

          <input
            placeholder="Email Address"
            style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
          />
          <input
            placeholder="Phone Number"
            style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
          />

          <UBDivider label="Account Setup" spacing="lg" />

          <input
            placeholder="Username"
            style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
          />
          <input
            type="password"
            placeholder="Password"
            style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
          />
        </div>
      </UBCard.Body>
    </UBCard>
  ),
};

export const NavigationSeparator: Story = {
  render: () => (
    <div>
      <nav
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          padding: '16px',
          backgroundColor: '#f8f9fa',
          borderRadius: '8px',
        }}
      >
        <a href="#" style={{ textDecoration: 'none', color: '#007bff' }}>
          Home
        </a>
        <UBDivider orientation="vertical" spacing="none" />
        <a href="#" style={{ textDecoration: 'none', color: '#007bff' }}>
          About
        </a>
        <UBDivider orientation="vertical" spacing="none" />
        <a href="#" style={{ textDecoration: 'none', color: '#007bff' }}>
          Services
        </a>
        <UBDivider orientation="vertical" spacing="none" />
        <a href="#" style={{ textDecoration: 'none', color: '#007bff' }}>
          Contact
        </a>
      </nav>

      <UBDivider spacing="lg" />

      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span>Breadcrumb:</span>
        <span>Home</span>
        <UBDivider orientation="vertical" spacing="none" />
        <span>Products</span>
        <UBDivider orientation="vertical" spacing="none" />
        <span>Electronics</span>
      </div>
    </div>
  ),
};

export const ContentSeparator: Story = {
  render: () => (
    <div>
      <article>
        <h2>Introduction</h2>
        <p>
          This is the introduction section of our article with some sample content to demonstrate
          how dividers can be used to separate different sections of content.
        </p>

        <UBDivider label="Main Content" variant="dashed" />

        <h2>Main Discussion</h2>
        <p>
          Here we dive into the main topic with detailed explanations and examples. This section
          contains the bulk of our content.
        </p>
        <p>Additional paragraphs continue the discussion with more details and insights.</p>

        <UBDivider label="Conclusion" variant="dotted" />

        <h2>Conclusion</h2>
        <p>
          Finally, we wrap up our discussion with key takeaways and final thoughts on the topic.
        </p>

        <UBDivider spacing="lg" />

        <footer style={{ fontSize: '14px', color: '#666' }}>
          Published on March 15, 2024 | Last updated: March 20, 2024
        </footer>
      </article>
    </div>
  ),
};
