import type { Meta, StoryObj } from '@storybook/react-vite';
import UBLayoutTweaking from './UBLayoutTweaking';

const meta: Meta<typeof UBLayoutTweaking> = {
  title: 'Scratchpad/UBLayoutTweaking',
  component: UBLayoutTweaking,
};

export default meta;

type Story = StoryObj<typeof UBLayoutTweaking>;

export const Default: Story = {};
