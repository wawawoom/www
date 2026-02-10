import type { Meta, StoryObj } from "@storybook/react";

import { WuiAlert } from "./WuiAlert";
import { WuiAlertColor } from "./WuiAlert.props";

const meta = {
  title: "Components/WuiAlert",
  component: WuiAlert,
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
      options: Object.values(WuiAlertColor),
      table: {
        type: { summary: "WuiAlertColor" },
        defaultValue: { summary: "WuiAlertColor.INFO" },
      },
    },
    icon: {
      description:
        "Optional custom icon (e.g. Font Awesome classes). Defaults to variant icon.",
      control: "text",
      table: {
        type: { summary: "string" },
      },
    },
    children: {
      control: "text",
      table: {
        type: { summary: "ReactNode" },
        defaultValue: { summary: "Alert message" },
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
} satisfies Meta<typeof WuiAlert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Component: Story = {
  args: {
    color: WuiAlertColor.INFO,
    children: "We've updated a few things.",
  },
};

export const Documentation: Story = {
  tags: ["!dev"],
  parameters: {
    docsOnly: true,
    controls: { disable: true },
  },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem", minWidth: "24rem" }}>
      <WuiAlert color={WuiAlertColor.SUCCESS}>
        Your account has been saved.
      </WuiAlert>

      <WuiAlert color={WuiAlertColor.ERROR}>
        Your email address is invalid.
      </WuiAlert>

      <WuiAlert color={WuiAlertColor.WARNING}>
        You are currently on the Free plan.
      </WuiAlert>

      <WuiAlert color={WuiAlertColor.INFO}>
        We've updated a few things.
      </WuiAlert>
    </div>
  ),
};
