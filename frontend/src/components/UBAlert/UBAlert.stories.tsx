import type { Meta, StoryObj } from '@storybook/react-vite';
import UBAlert from './UBAlert';
import type { ComponentProps } from 'react';
import { fn } from 'storybook/test';
import { useState } from 'react';

type UBAlertProps = ComponentProps<typeof UBAlert>;

const meta: Meta<UBAlertProps> = {
  title: 'ToReview/UBAlert',
  component: UBAlert,
  argTypes: {
    variant: { control: 'select', options: ['info', 'success', 'warning', 'error'] },
    title: { control: 'text' },
    dismissible: { control: 'boolean' },
    onDismiss: { action: 'dismissed' },
  },
  args: {
    variant: 'info',
    title: 'Information',
    dismissible: false,
    children: 'This is an informational message.',
    onDismiss: fn(),
  },
};

export default meta;

type Story = StoryObj<UBAlertProps>;

export const Default: Story = {};

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <UBAlert variant="info" title="Information">
        This is an informational message with helpful details.
      </UBAlert>

      <UBAlert variant="success" title="Success">
        Your action was completed successfully!
      </UBAlert>

      <UBAlert variant="warning" title="Warning">
        Please review the following information before proceeding.
      </UBAlert>

      <UBAlert variant="error" title="Error">
        Something went wrong. Please try again.
      </UBAlert>
    </div>
  ),
};

export const WithoutTitle: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <UBAlert variant="info">This is an informational message without a title.</UBAlert>

      <UBAlert variant="success">Operation completed successfully!</UBAlert>

      <UBAlert variant="warning">Please check your input.</UBAlert>

      <UBAlert variant="error">An error occurred.</UBAlert>
    </div>
  ),
};

export const Dismissible: Story = {
  render: () => {
    const [alerts, setAlerts] = useState([
      {
        id: 'info',
        variant: 'info' as const,
        title: 'Dismissible Info',
        message: 'Click the × to dismiss this alert.',
      },
      {
        id: 'success',
        variant: 'success' as const,
        title: 'Dismissible Success',
        message: 'This alert can be closed.',
      },
      {
        id: 'warning',
        variant: 'warning' as const,
        title: 'Dismissible Warning',
        message: 'You can dismiss this warning.',
      },
      {
        id: 'error',
        variant: 'error' as const,
        title: 'Dismissible Error',
        message: 'This error alert is dismissible.',
      },
    ]);

    const dismissAlert = (id: string) => {
      setAlerts(prev => prev.filter(alert => alert.id !== id));
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {alerts.map(alert => (
          <UBAlert
            key={alert.id}
            variant={alert.variant}
            title={alert.title}
            dismissible
            onDismiss={() => dismissAlert(alert.id)}
          >
            {alert.message}
          </UBAlert>
        ))}

        {alerts.length === 0 && (
          <div style={{ padding: '2rem', textAlign: 'center', color: '#666' }}>
            All alerts have been dismissed!
            <br />
            <button
              onClick={() =>
                setAlerts([
                  {
                    id: 'info',
                    variant: 'info',
                    title: 'Dismissible Info',
                    message: 'Click the × to dismiss this alert.',
                  },
                  {
                    id: 'success',
                    variant: 'success',
                    title: 'Dismissible Success',
                    message: 'This alert can be closed.',
                  },
                  {
                    id: 'warning',
                    variant: 'warning',
                    title: 'Dismissible Warning',
                    message: 'You can dismiss this warning.',
                  },
                  {
                    id: 'error',
                    variant: 'error',
                    title: 'Dismissible Error',
                    message: 'This error alert is dismissible.',
                  },
                ])
              }
              style={{
                marginTop: '1rem',
                padding: '0.5rem 1rem',
                border: '1px solid #ccc',
                borderRadius: '4px',
                background: 'white',
                cursor: 'pointer',
              }}
            >
              Reset Alerts
            </button>
          </div>
        )}
      </div>
    );
  },
};

export const CustomIcons: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <UBAlert
        variant="info"
        title="Custom Icon"
        icon={<span style={{ fontSize: '1.2em' }}>🔔</span>}
      >
        This alert uses a custom notification icon.
      </UBAlert>

      <UBAlert
        variant="success"
        title="Custom Icon"
        icon={<span style={{ fontSize: '1.2em' }}>🎉</span>}
      >
        This alert uses a custom celebration icon.
      </UBAlert>

      <UBAlert
        variant="warning"
        title="Custom Icon"
        icon={<span style={{ fontSize: '1.2em' }}>🚨</span>}
      >
        This alert uses a custom warning siren icon.
      </UBAlert>

      <UBAlert
        variant="error"
        title="Custom Icon"
        icon={<span style={{ fontSize: '1.2em' }}>💥</span>}
      >
        This alert uses a custom explosion icon.
      </UBAlert>
    </div>
  ),
};

export const NoIcons: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <UBAlert variant="info" title="No Icon" icon={null}>
        This alert has no icon.
      </UBAlert>

      <UBAlert variant="success" title="No Icon" icon={null}>
        This alert also has no icon.
      </UBAlert>
    </div>
  ),
};

export const LongContent: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <UBAlert variant="info" title="Detailed Information" dismissible>
        This is a longer alert message that demonstrates how the component handles multiple lines of
        text. The content should wrap naturally and maintain proper spacing and alignment. You can
        include important information here that users need to read carefully. The dismiss button
        should remain properly positioned even with longer content.
      </UBAlert>

      <UBAlert variant="warning" title="Important Notice">
        <div>
          <p style={{ margin: '0 0 0.5rem 0' }}>This alert contains structured content:</p>
          <ul style={{ margin: 0, paddingLeft: '1.2rem' }}>
            <li>First important point</li>
            <li>Second critical detail</li>
            <li>Third necessary action item</li>
          </ul>
        </div>
      </UBAlert>
    </div>
  ),
};

export const OnlyTitle: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <UBAlert variant="info" title="Just a title" />
      <UBAlert variant="success" title="Operation completed" dismissible />
      <UBAlert variant="warning" title="Action required" />
      <UBAlert variant="error" title="Critical error" />
    </div>
  ),
};

export const Interactive: Story = {
  render: () => {
    const [showAlert, setShowAlert] = useState(true);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {showAlert ? (
          <UBAlert
            variant="success"
            title="Form Submitted"
            dismissible
            onDismiss={() => setShowAlert(false)}
          >
            Your form has been successfully submitted. We'll get back to you within 24 hours.
          </UBAlert>
        ) : (
          <div
            style={{
              padding: '1rem',
              border: '2px dashed #ccc',
              borderRadius: '8px',
              textAlign: 'center',
            }}
          >
            <p>Alert was dismissed</p>
            <button
              onClick={() => setShowAlert(true)}
              style={{
                padding: '0.5rem 1rem',
                border: '1px solid #ccc',
                borderRadius: '4px',
                background: 'white',
                cursor: 'pointer',
              }}
            >
              Show Alert Again
            </button>
          </div>
        )}
      </div>
    );
  },
};
