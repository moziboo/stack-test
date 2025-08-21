import type { Meta, StoryObj } from '@storybook/react-vite';
import UBCard from './UBCard';
import UBButton from '../UBButton/UBButton';

const meta: Meta<typeof UBCard> = {
  title: 'ToReview/UBCard',
  component: UBCard,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'outlined', 'elevated'],
    },
    padding: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof UBCard>;

export const Default: Story = {
  args: {
    children: (
      <>
        <UBCard.Header>
          <h3>Card Title</h3>
        </UBCard.Header>
        <UBCard.Body>
          <p>This is the card body content. It can contain any kind of content you need.</p>
        </UBCard.Body>
      </>
    ),
  },
};

export const WithFooter: Story = {
  args: {
    children: (
      <>
        <UBCard.Header divider>
          <h3>User Profile</h3>
        </UBCard.Header>
        <UBCard.Body>
          <p>
            <strong>Name:</strong> John Doe
          </p>
          <p>
            <strong>Email:</strong> john.doe@example.com
          </p>
          <p>
            <strong>Role:</strong> Administrator
          </p>
        </UBCard.Body>
        <UBCard.Footer divider justify="between">
          <UBButton>Cancel</UBButton>
          <UBButton>Save Changes</UBButton>
        </UBCard.Footer>
      </>
    ),
  },
};

export const Outlined: Story = {
  args: {
    variant: 'outlined',
    children: (
      <>
        <UBCard.Header>
          <h3>Outlined Card</h3>
        </UBCard.Header>
        <UBCard.Body>
          <p>This card has an outlined variant with transparent background.</p>
        </UBCard.Body>
      </>
    ),
  },
};

export const Elevated: Story = {
  args: {
    variant: 'elevated',
    children: (
      <>
        <UBCard.Header>
          <h3>Elevated Card</h3>
        </UBCard.Header>
        <UBCard.Body>
          <p>This card has elevation with shadow effects.</p>
        </UBCard.Body>
      </>
    ),
  },
};

export const NoPadding: Story = {
  args: {
    padding: 'none',
    children: (
      <>
        <UBCard.Header>
          <h3>No Padding Card</h3>
        </UBCard.Header>
        <UBCard.Body padding="md">
          <p>The card has no padding, but the body has its own padding.</p>
        </UBCard.Body>
      </>
    ),
  },
};

export const SimpleContent: Story = {
  args: {
    children: (
      <UBCard.Body>
        <p>Simple card with just body content, no header or footer.</p>
      </UBCard.Body>
    ),
  },
};
