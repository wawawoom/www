import type { Meta, StoryObj } from "@storybook/react";

import { WuiTitle } from "../WuiTitle/WuiTitle";
import { WuiTitleAs, WuiTitleLook } from "../WuiTitle/WuiTitle.props";
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
        defaultValue: { summary: "WuiBadgeColor.DARK" },
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

export const All: Story = {
  tags: ["!dev"],
  parameters: {
    docsOnly: true,
    controls: { disable: true },
  },
  render: () => (
    <div>
      <WuiTitle as={WuiTitleAs.H2} look={WuiTitleLook.H5}>
        WuiBadge at WuiBadgeSize.L:
      </WuiTitle>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "0.5rem",
          alignItems: "center",
          marginBottom: "3rem",
        }}
      >
        {Object.values(WuiBadgeColor).map((color) => (
          <WuiBadge key={color} color={color} size={WuiBadgeSize.L}>
            {color}
          </WuiBadge>
        ))}
      </div>

      <WuiTitle as={WuiTitleAs.H2} look={WuiTitleLook.H5}>
        WuiBadge at WuiBadgeSize.M (default):
      </WuiTitle>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "0.5rem",
          alignItems: "center",
          marginBottom: "3rem",
        }}
      >
        {Object.values(WuiBadgeColor).map((color) => (
          <WuiBadge key={color} color={color}>
            {color}
          </WuiBadge>
        ))}
      </div>

      <WuiTitle as={WuiTitleAs.H2} look={WuiTitleLook.H5}>
        WuiBadge at WuiBadgeSize.S:
      </WuiTitle>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "0.5rem",
          alignItems: "center",
          marginBottom: "3rem",
        }}
      >
        {Object.values(WuiBadgeColor).map((color) => (
          <WuiBadge key={color} color={color} size={WuiBadgeSize.S}>
            {color}
          </WuiBadge>
        ))}
      </div>
    </div>
  ),
};
