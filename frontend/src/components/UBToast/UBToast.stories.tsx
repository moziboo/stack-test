import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import UBToast from './UBToast';
import UBButton from '../UBButton/UBButton';

const meta: Meta<typeof UBToast> = {
  title: 'ToReview/UBToast',
  component: UBToast,
  parameters: {
    layout: 'padded',
  },
  decorators: [
    Story => (
      <UBToast.Provider>
        <Story />
      </UBToast.Provider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof UBToast>;

// Helper component for interactive stories
const ToastDemo = ({
  variant = 'default',
  title = 'Notification',
  description = 'This is a toast notification message.',
  showAction = false,
  actionText = 'Undo',
}) => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <UBButton onClick={() => setOpen(true)}>Show {variant} Toast</UBButton>

      <UBToast open={open} onOpenChange={setOpen}>
        <UBToast.Content variant={variant}>
          <UBToast.Title>{title}</UBToast.Title>
          <UBToast.Description>{description}</UBToast.Description>
        </UBToast.Content>
        {showAction && (
          <UBToast.Action altText="Undo action" onClick={() => setOpen(false)}>
            {actionText}
          </UBToast.Action>
        )}
        <UBToast.Close />
      </UBToast>
    </div>
  );
};

export const Default: Story = {
  render: () => <ToastDemo />,
};

export const Success: Story = {
  render: () => (
    <ToastDemo
      variant="success"
      title="Success!"
      description="Your changes have been saved successfully."
    />
  ),
};

export const Warning: Story = {
  render: () => (
    <ToastDemo
      variant="warning"
      title="Warning"
      description="Please review your input before continuing."
    />
  ),
};

export const Error: Story = {
  render: () => (
    <ToastDemo
      variant="error"
      title="Error"
      description="Something went wrong. Please try again."
    />
  ),
};

export const Info: Story = {
  render: () => (
    <ToastDemo
      variant="info"
      title="Information"
      description="New features are now available in your dashboard."
    />
  ),
};

export const WithAction: Story = {
  render: () => (
    <ToastDemo
      variant="default"
      title="Item deleted"
      description="The item has been moved to trash."
      showAction={true}
      actionText="Undo"
    />
  ),
};

export const TitleOnly: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <div>
        <UBButton onClick={() => setOpen(true)}>Show Title Only Toast</UBButton>

        <UBToast open={open} onOpenChange={setOpen}>
          <UBToast.Content variant="success">
            <UBToast.Title>Settings saved!</UBToast.Title>
          </UBToast.Content>
          <UBToast.Close />
        </UBToast>
      </div>
    );
  },
};

export const NoIcon: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <div>
        <UBButton onClick={() => setOpen(true)}>Show Toast Without Icon</UBButton>

        <UBToast open={open} onOpenChange={setOpen}>
          <UBToast.Content variant="default" showIcon={false}>
            <UBToast.Title>Clean notification</UBToast.Title>
            <UBToast.Description>This toast has no icon for a cleaner look.</UBToast.Description>
          </UBToast.Content>
          <UBToast.Close />
        </UBToast>
      </div>
    );
  },
};

export const MultipleToasts: Story = {
  render: () => {
    const [toasts, setToasts] = useState<
      Array<{ id: string; open: boolean; variant: string; title: string }>
    >([]);

    const addToast = (variant: string, title: string) => {
      const id = Math.random().toString(36).substr(2, 9);
      setToasts(prev => [...prev, { id, open: true, variant, title }]);
    };

    const removeToast = (id: string) => {
      setToasts(prev => prev.map(toast => (toast.id === id ? { ...toast, open: false } : toast)));
    };

    return (
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        <UBButton onClick={() => addToast('success', 'Success message')}>Add Success</UBButton>
        <UBButton onClick={() => addToast('warning', 'Warning message')}>Add Warning</UBButton>
        <UBButton onClick={() => addToast('error', 'Error message')}>Add Error</UBButton>

        {toasts.map(toast => (
          <UBToast
            key={toast.id}
            open={toast.open}
            onOpenChange={open => !open && removeToast(toast.id)}
          >
            <UBToast.Content variant={toast.variant as any}>
              <UBToast.Title>{toast.title}</UBToast.Title>
              <UBToast.Description>Toast ID: {toast.id}</UBToast.Description>
            </UBToast.Content>
            <UBToast.Close />
          </UBToast>
        ))}
      </div>
    );
  },
};
