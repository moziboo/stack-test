import type { Meta, StoryObj } from '@storybook/react-vite';
import UBModal from './UBModal';
import UBButton from '../UBButton';
import { useState } from 'react';

const meta: Meta = {
  title: 'ToReview/UBModal',
  component: UBModal,
  argTypes: {
    open: { control: 'boolean' },
  },
};

export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <UBModal open={open} onOpenChange={setOpen}>
        <UBModal.Trigger asChild>
          <UBButton>Open Modal</UBButton>
        </UBModal.Trigger>

        <UBModal.Content>
          <UBModal.Header>
            <UBModal.Title>Modal Title</UBModal.Title>
            <UBModal.Description>
              This is a description of what this modal is for.
            </UBModal.Description>
          </UBModal.Header>

          <UBModal.Body>
            <p>This is the main content of the modal. You can put any content here.</p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua.
            </p>
          </UBModal.Body>

          <UBModal.Footer>
            <UBModal.Close asChild>
              <UBButton variant="secondary">Cancel</UBButton>
            </UBModal.Close>
            <UBButton>Confirm</UBButton>
          </UBModal.Footer>
        </UBModal.Content>
      </UBModal>
    );
  },
};

export const SizeVariants: Story = {
  render: () => {
    const [openSm, setOpenSm] = useState(false);
    const [openMd, setOpenMd] = useState(false);
    const [openLg, setOpenLg] = useState(false);
    const [openXl, setOpenXl] = useState(false);
    const [openFull, setOpenFull] = useState(false);

    return (
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        {/* Small Modal */}
        <UBModal open={openSm} onOpenChange={setOpenSm}>
          <UBModal.Trigger asChild>
            <UBButton>Small Modal</UBButton>
          </UBModal.Trigger>

          <UBModal.Content size="sm">
            <UBModal.Header>
              <UBModal.Title>Small Modal</UBModal.Title>
            </UBModal.Header>

            <UBModal.Body>
              <p>This is a small modal (400px max width).</p>
            </UBModal.Body>

            <UBModal.Footer>
              <UBModal.Close asChild>
                <UBButton>Close</UBButton>
              </UBModal.Close>
            </UBModal.Footer>
          </UBModal.Content>
        </UBModal>

        {/* Medium Modal */}
        <UBModal open={openMd} onOpenChange={setOpenMd}>
          <UBModal.Trigger asChild>
            <UBButton>Medium Modal</UBButton>
          </UBModal.Trigger>

          <UBModal.Content size="md">
            <UBModal.Header>
              <UBModal.Title>Medium Modal</UBModal.Title>
            </UBModal.Header>

            <UBModal.Body>
              <p>This is a medium modal (500px max width) - the default size.</p>
            </UBModal.Body>

            <UBModal.Footer>
              <UBModal.Close asChild>
                <UBButton>Close</UBButton>
              </UBModal.Close>
            </UBModal.Footer>
          </UBModal.Content>
        </UBModal>

        {/* Large Modal */}
        <UBModal open={openLg} onOpenChange={setOpenLg}>
          <UBModal.Trigger asChild>
            <UBButton>Large Modal</UBButton>
          </UBModal.Trigger>

          <UBModal.Content size="lg">
            <UBModal.Header>
              <UBModal.Title>Large Modal</UBModal.Title>
            </UBModal.Header>

            <UBModal.Body>
              <p>This is a large modal (700px max width).</p>
              <p>It can accommodate more content comfortably.</p>
            </UBModal.Body>

            <UBModal.Footer>
              <UBModal.Close asChild>
                <UBButton>Close</UBButton>
              </UBModal.Close>
            </UBModal.Footer>
          </UBModal.Content>
        </UBModal>

        {/* Extra Large Modal */}
        <UBModal open={openXl} onOpenChange={setOpenXl}>
          <UBModal.Trigger asChild>
            <UBButton>XL Modal</UBButton>
          </UBModal.Trigger>

          <UBModal.Content size="xl">
            <UBModal.Header>
              <UBModal.Title>Extra Large Modal</UBModal.Title>
            </UBModal.Header>

            <UBModal.Body>
              <p>This is an extra large modal (900px max width).</p>
              <p>Perfect for complex forms or detailed content.</p>
            </UBModal.Body>

            <UBModal.Footer>
              <UBModal.Close asChild>
                <UBButton>Close</UBButton>
              </UBModal.Close>
            </UBModal.Footer>
          </UBModal.Content>
        </UBModal>

        {/* Full Screen Modal */}
        <UBModal open={openFull} onOpenChange={setOpenFull}>
          <UBModal.Trigger asChild>
            <UBButton>Full Screen</UBButton>
          </UBModal.Trigger>

          <UBModal.Content size="full">
            <UBModal.Header>
              <UBModal.Title>Full Screen Modal</UBModal.Title>
            </UBModal.Header>

            <UBModal.Body>
              <p>This is a full screen modal (95vw x 95vh).</p>
              <p>Great for complex interfaces or data tables.</p>
            </UBModal.Body>

            <UBModal.Footer>
              <UBModal.Close asChild>
                <UBButton>Close</UBButton>
              </UBModal.Close>
            </UBModal.Footer>
          </UBModal.Content>
        </UBModal>
      </div>
    );
  },
};

export const WithoutCloseButton: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <UBModal open={open} onOpenChange={setOpen}>
        <UBModal.Trigger asChild>
          <UBButton>Modal without X Button</UBButton>
        </UBModal.Trigger>

        <UBModal.Content showCloseButton={false}>
          <UBModal.Header>
            <UBModal.Title>No Close Button</UBModal.Title>
            <UBModal.Description>
              This modal doesn't have the X button in the top right.
            </UBModal.Description>
          </UBModal.Header>

          <UBModal.Body>
            <p>You must use one of the buttons below to close this modal.</p>
          </UBModal.Body>

          <UBModal.Footer>
            <UBModal.Close asChild>
              <UBButton variant="secondary">Cancel</UBButton>
            </UBModal.Close>
            <UBModal.Close asChild>
              <UBButton>Save</UBButton>
            </UBModal.Close>
          </UBModal.Footer>
        </UBModal.Content>
      </UBModal>
    );
  },
};

export const ConfirmationDialog: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <UBModal open={open} onOpenChange={setOpen}>
        <UBModal.Trigger asChild>
          <UBButton variant="danger">Delete Item</UBButton>
        </UBModal.Trigger>

        <UBModal.Content size="sm">
          <UBModal.Header>
            <UBModal.Title>Confirm Deletion</UBModal.Title>
            <UBModal.Description>This action cannot be undone.</UBModal.Description>
          </UBModal.Header>

          <UBModal.Body>
            <p>
              Are you sure you want to delete this item? This action is permanent and cannot be
              reversed.
            </p>
          </UBModal.Body>

          <UBModal.Footer>
            <UBModal.Close asChild>
              <UBButton variant="secondary">Cancel</UBButton>
            </UBModal.Close>
            <UBModal.Close asChild>
              <UBButton variant="danger">Delete</UBButton>
            </UBModal.Close>
          </UBModal.Footer>
        </UBModal.Content>
      </UBModal>
    );
  },
};

export const FormModal: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <UBModal open={open} onOpenChange={setOpen}>
        <UBModal.Trigger asChild>
          <UBButton>Add User</UBButton>
        </UBModal.Trigger>

        <UBModal.Content>
          <UBModal.Header>
            <UBModal.Title>Add New User</UBModal.Title>
            <UBModal.Description>Enter the user's information below.</UBModal.Description>
          </UBModal.Header>

          <UBModal.Body>
            <form style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label htmlFor="name" style={{ display: 'block', marginBottom: '0.5rem' }}>
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  style={{
                    width: '100%',
                    padding: '0.5rem',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                  }}
                />
              </div>

              <div>
                <label htmlFor="email" style={{ display: 'block', marginBottom: '0.5rem' }}>
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  style={{
                    width: '100%',
                    padding: '0.5rem',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                  }}
                />
              </div>

              <div>
                <label htmlFor="role" style={{ display: 'block', marginBottom: '0.5rem' }}>
                  Role
                </label>
                <select
                  id="role"
                  style={{
                    width: '100%',
                    padding: '0.5rem',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                  }}
                >
                  <option value="">Select a role</option>
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                  <option value="viewer">Viewer</option>
                </select>
              </div>
            </form>
          </UBModal.Body>

          <UBModal.Footer>
            <UBModal.Close asChild>
              <UBButton variant="secondary">Cancel</UBButton>
            </UBModal.Close>
            <UBButton>Add User</UBButton>
          </UBModal.Footer>
        </UBModal.Content>
      </UBModal>
    );
  },
};

export const LongContent: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <UBModal open={open} onOpenChange={setOpen}>
        <UBModal.Trigger asChild>
          <UBButton>Long Content Modal</UBButton>
        </UBModal.Trigger>

        <UBModal.Content>
          <UBModal.Header>
            <UBModal.Title>Terms of Service</UBModal.Title>
            <UBModal.Description>Please read and accept our terms of service.</UBModal.Description>
          </UBModal.Header>

          <UBModal.Body>
            {Array.from({ length: 20 }, (_, i) => (
              <p key={i}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                pariatur.
              </p>
            ))}
          </UBModal.Body>

          <UBModal.Footer>
            <UBModal.Close asChild>
              <UBButton variant="secondary">Decline</UBButton>
            </UBModal.Close>
            <UBModal.Close asChild>
              <UBButton>Accept</UBButton>
            </UBModal.Close>
          </UBModal.Footer>
        </UBModal.Content>
      </UBModal>
    );
  },
};
