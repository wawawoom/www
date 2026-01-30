import type { Meta, StoryObj } from "@storybook/react";

import { WuiBadge } from "./WuiBadge";
import { WuiBadgeColor, WuiBadgeSize } from "./WuiBadge.props";

const meta = {
  title: "Components/WuiBadge",
  component: WuiBadge,
  parameters: {
    layout: "centered",
    controls: {
      expanded: true,
      sort: "requiredFirst",
    },
  },
  tags: ["!autodocs"],
  argTypes: {
    color: {
      control: "select",
      options: Object.values(WuiBadgeColor),
      table: {
        type: { summary: "WuiBadgeColor" },
        defaultValue: { summary: "WuiBadgeColor.LIGHT" },
      },
    },
    size: {
      control: "select",
      options: Object.values(WuiBadgeSize),
      table: {
        type: { summary: "WuiBadgeSize" },
        defaultValue: { summary: "WuiBadgeSize.M" },
      },
    },
    children: {
      control: "text",
      table: {
        type: { summary: "ReactNode" },
        defaultValue: { summary: "badge" },
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
} satisfies Meta<typeof WuiBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Component: Story = {
  args: {
    children: "badge",
  },
};
