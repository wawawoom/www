import type { Meta, StoryObj } from '@storybook/react';
import { WuiButton } from './WuiButton';
import { WuiButtonColor, WuiButtonSize } from './WuiButton.props';

const meta = {
  title: 'Components/WuiButton',
  component: WuiButton,
  parameters: {
    layout: 'centered',
    controls: {
      expanded: true,
      sort: 'requiredFirst',
    },
  },
  tags: ['!autodocs'],
  argTypes: {
    color: {
      control: 'select',
      options: Object.values(WuiButtonColor),
      table: {
        type: { summary: 'WuiButtonColor' },
        defaultValue: { summary: 'WuiButtonColor.LIGHT' },
      },
    },
    size: {
      control: 'select',
      options: Object.values(WuiButtonSize),
      table: {
        type: { summary: 'WuiButtonSize' },
        defaultValue: { summary: 'WuiButtonSize.M' },
      },
    },
    disabled: {
      control: 'boolean',
    },
    children: {
      control: 'text',
      table: {
        type: { summary: 'ReactNode' },
        defaultValue: { summary: 'Button' },
      },
    },
    className: {
      description: "Additional CSS classes to apply to the component.",
      control: "text",
      table: {
        type: { summary: "string" },
      },
    },
  },
} satisfies Meta<typeof WuiButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Component: Story = {
  args: {
    children: "I'm a button"
  },
};