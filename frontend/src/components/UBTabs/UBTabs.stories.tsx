import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import UBTabs from './UBTabs';

const meta: Meta<typeof UBTabs> = {
  title: 'ToReview/UBTabs',
  component: UBTabs,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
    },
    activationMode: {
      control: 'select',
      options: ['automatic', 'manual'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof UBTabs>;

export const Default: Story = {
  args: {
    value: 'tab1',
    children: (
      <>
        <UBTabs.List>
          <UBTabs.Trigger value="tab1">Account</UBTabs.Trigger>
          <UBTabs.Trigger value="tab2">Password</UBTabs.Trigger>
          <UBTabs.Trigger value="tab3">Billing</UBTabs.Trigger>
        </UBTabs.List>
        <UBTabs.Content value="tab1">
          <h3>Account Settings</h3>
          <p>Make changes to your account here. Click save when you're done.</p>
        </UBTabs.Content>
        <UBTabs.Content value="tab2">
          <h3>Password Settings</h3>
          <p>Change your password here. After saving, you'll be logged out.</p>
        </UBTabs.Content>
        <UBTabs.Content value="tab3">
          <h3>Billing Information</h3>
          <p>Update your billing details and payment method here.</p>
        </UBTabs.Content>
      </>
    ),
  },
};

export const Interactive: Story = {
  render: () => {
    const [activeTab, setActiveTab] = useState('overview');

    return (
      <UBTabs value={activeTab} onValueChange={setActiveTab}>
        <UBTabs.List>
          <UBTabs.Trigger value="overview">Overview</UBTabs.Trigger>
          <UBTabs.Trigger value="analytics">Analytics</UBTabs.Trigger>
          <UBTabs.Trigger value="settings">Settings</UBTabs.Trigger>
          <UBTabs.Trigger value="billing">Billing</UBTabs.Trigger>
        </UBTabs.List>
        <UBTabs.Content value="overview">
          <h3>📊 Dashboard Overview</h3>
          <p>Welcome to your dashboard! Here you can see a summary of your account activity.</p>
          <div
            style={{
              marginTop: '16px',
              padding: '12px',
              backgroundColor: '#f0f9ff',
              borderRadius: '8px',
            }}
          >
            <strong>Current tab:</strong> {activeTab}
          </div>
        </UBTabs.Content>
        <UBTabs.Content value="analytics">
          <h3>📈 Analytics & Insights</h3>
          <p>Dive deep into your data with detailed analytics and performance metrics.</p>
          <ul>
            <li>User engagement trends</li>
            <li>Conversion rates</li>
            <li>Traffic sources</li>
            <li>Revenue analytics</li>
          </ul>
          <div
            style={{
              marginTop: '16px',
              padding: '12px',
              backgroundColor: '#f0f9ff',
              borderRadius: '8px',
            }}
          >
            <strong>Current tab:</strong> {activeTab}
          </div>
        </UBTabs.Content>
        <UBTabs.Content value="settings">
          <h3>⚙️ Account Settings</h3>
          <p>Manage your account preferences and configuration options.</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '16px' }}>
            <label>
              <input type="checkbox" /> Enable notifications
            </label>
            <label>
              <input type="checkbox" defaultChecked /> Auto-save preferences
            </label>
            <label>
              <input type="checkbox" /> Dark mode
            </label>
          </div>
          <div
            style={{
              marginTop: '16px',
              padding: '12px',
              backgroundColor: '#f0f9ff',
              borderRadius: '8px',
            }}
          >
            <strong>Current tab:</strong> {activeTab}
          </div>
        </UBTabs.Content>
        <UBTabs.Content value="billing">
          <h3>💳 Billing & Subscription</h3>
          <p>Manage your subscription, payment methods, and billing history.</p>
          <div style={{ marginTop: '16px' }}>
            <p>
              <strong>Current Plan:</strong> Pro Plan ($29/month)
            </p>
            <p>
              <strong>Next Billing:</strong> March 15, 2024
            </p>
            <p>
              <strong>Payment Method:</strong> **** **** **** 1234
            </p>
          </div>
          <div
            style={{
              marginTop: '16px',
              padding: '12px',
              backgroundColor: '#f0f9ff',
              borderRadius: '8px',
            }}
          >
            <strong>Current tab:</strong> {activeTab}
          </div>
        </UBTabs.Content>
      </UBTabs>
    );
  },
};

export const Pills: Story = {
  args: {
    value: 'overview',
    children: (
      <>
        <UBTabs.List variant="pills">
          <UBTabs.Trigger value="overview">Overview</UBTabs.Trigger>
          <UBTabs.Trigger value="analytics">Analytics</UBTabs.Trigger>
          <UBTabs.Trigger value="reports">Reports</UBTabs.Trigger>
          <UBTabs.Trigger value="notifications">Notifications</UBTabs.Trigger>
        </UBTabs.List>
        <UBTabs.Content value="overview">
          <h3>Dashboard Overview</h3>
          <p>Get a quick overview of your dashboard metrics and recent activity.</p>
        </UBTabs.Content>
        <UBTabs.Content value="analytics">
          <h3>Analytics</h3>
          <p>Detailed analytics and insights about your application usage.</p>
        </UBTabs.Content>
        <UBTabs.Content value="reports">
          <h3>Reports</h3>
          <p>Generate and download reports for your data analysis needs.</p>
        </UBTabs.Content>
        <UBTabs.Content value="notifications">
          <h3>Notifications</h3>
          <p>Configure your notification preferences and manage alerts.</p>
        </UBTabs.Content>
      </>
    ),
  },
};

export const Underline: Story = {
  args: {
    value: 'posts',
    children: (
      <>
        <UBTabs.List variant="underline">
          <UBTabs.Trigger value="posts">Posts</UBTabs.Trigger>
          <UBTabs.Trigger value="comments">Comments</UBTabs.Trigger>
          <UBTabs.Trigger value="likes">Likes</UBTabs.Trigger>
        </UBTabs.List>
        <UBTabs.Content value="posts">
          <h3>Your Posts</h3>
          <p>View and manage all your published posts here.</p>
        </UBTabs.Content>
        <UBTabs.Content value="comments">
          <h3>Comments</h3>
          <p>Review and respond to comments on your content.</p>
        </UBTabs.Content>
        <UBTabs.Content value="likes">
          <h3>Likes & Reactions</h3>
          <p>See who liked and reacted to your posts.</p>
        </UBTabs.Content>
      </>
    ),
  },
};

export const Vertical: Story = {
  args: {
    orientation: 'vertical',
    value: 'general',
    children: (
      <>
        <UBTabs.List>
          <UBTabs.Trigger value="general">General</UBTabs.Trigger>
          <UBTabs.Trigger value="security">Security</UBTabs.Trigger>
          <UBTabs.Trigger value="integrations">Integrations</UBTabs.Trigger>
          <UBTabs.Trigger value="advanced">Advanced</UBTabs.Trigger>
        </UBTabs.List>
        <UBTabs.Content value="general">
          <h3>General Settings</h3>
          <p>Configure your general application preferences and basic settings.</p>
        </UBTabs.Content>
        <UBTabs.Content value="security">
          <h3>Security Settings</h3>
          <p>Manage your security settings, two-factor authentication, and privacy options.</p>
        </UBTabs.Content>
        <UBTabs.Content value="integrations">
          <h3>Integrations</h3>
          <p>Connect and manage third-party integrations and API access.</p>
        </UBTabs.Content>
        <UBTabs.Content value="advanced">
          <h3>Advanced Settings</h3>
          <p>Advanced configuration options for power users.</p>
        </UBTabs.Content>
      </>
    ),
  },
};

export const SmallSize: Story = {
  args: {
    value: 'tab1',
    children: (
      <>
        <UBTabs.List size="sm" variant="pills">
          <UBTabs.Trigger value="tab1">Small</UBTabs.Trigger>
          <UBTabs.Trigger value="tab2">Compact</UBTabs.Trigger>
          <UBTabs.Trigger value="tab3">Tabs</UBTabs.Trigger>
        </UBTabs.List>
        <UBTabs.Content value="tab1">
          <p>Small sized tabs are perfect for compact interfaces.</p>
        </UBTabs.Content>
        <UBTabs.Content value="tab2">
          <p>These tabs take up less vertical space.</p>
        </UBTabs.Content>
        <UBTabs.Content value="tab3">
          <p>Ideal for dense layouts and smaller screens.</p>
        </UBTabs.Content>
      </>
    ),
  },
};

export const LargeSize: Story = {
  args: {
    value: 'tab1',
    children: (
      <>
        <UBTabs.List size="lg">
          <UBTabs.Trigger value="tab1">Large</UBTabs.Trigger>
          <UBTabs.Trigger value="tab2">Prominent</UBTabs.Trigger>
          <UBTabs.Trigger value="tab3">Navigation</UBTabs.Trigger>
        </UBTabs.List>
        <UBTabs.Content value="tab1">
          <h3>Large Navigation</h3>
          <p>
            Large tabs are great for primary navigation and when you want to emphasize the tab
            interface.
          </p>
        </UBTabs.Content>
        <UBTabs.Content value="tab2">
          <h3>Prominent Display</h3>
          <p>These tabs are more prominent and easier to interact with on touch devices.</p>
        </UBTabs.Content>
        <UBTabs.Content value="tab3">
          <h3>Enhanced Visibility</h3>
          <p>Perfect for main navigation areas where visibility is important.</p>
        </UBTabs.Content>
      </>
    ),
  },
};

export const WithDisabledTab: Story = {
  args: {
    value: 'available1',
    children: (
      <>
        <UBTabs.List>
          <UBTabs.Trigger value="available1">Available</UBTabs.Trigger>
          <UBTabs.Trigger value="disabled" disabled>
            Disabled
          </UBTabs.Trigger>
          <UBTabs.Trigger value="available2">Also Available</UBTabs.Trigger>
        </UBTabs.List>
        <UBTabs.Content value="available1">
          <h3>Available Content</h3>
          <p>This tab is available and accessible to users.</p>
        </UBTabs.Content>
        <UBTabs.Content value="disabled">
          <h3>Disabled Content</h3>
          <p>This content won't be accessible because the tab is disabled.</p>
        </UBTabs.Content>
        <UBTabs.Content value="available2">
          <h3>Another Available Tab</h3>
          <p>Users can access this tab as well.</p>
        </UBTabs.Content>
      </>
    ),
  },
};

export const ManualActivation: Story = {
  args: {
    activationMode: 'manual',
    value: 'step1',
    children: (
      <>
        <UBTabs.List variant="pills">
          <UBTabs.Trigger value="step1">Step 1</UBTabs.Trigger>
          <UBTabs.Trigger value="step2">Step 2</UBTabs.Trigger>
          <UBTabs.Trigger value="step3">Step 3</UBTabs.Trigger>
        </UBTabs.List>
        <UBTabs.Content value="step1">
          <h3>Step 1: Setup</h3>
          <p>
            Manual activation mode requires clicking or pressing Enter/Space to activate tabs (not
            just focus).
          </p>
        </UBTabs.Content>
        <UBTabs.Content value="step2">
          <h3>Step 2: Configuration</h3>
          <p>Try using Tab key to focus between tabs, then press Enter or Space to activate.</p>
        </UBTabs.Content>
        <UBTabs.Content value="step3">
          <h3>Step 3: Complete</h3>
          <p>This is useful for complex forms where accidental navigation should be prevented.</p>
        </UBTabs.Content>
      </>
    ),
  },
};
