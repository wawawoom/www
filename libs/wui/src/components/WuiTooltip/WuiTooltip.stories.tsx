import type { Meta, StoryObj } from "@storybook/react";

import { WuiButton } from "../WuiButton/WuiButton";
import { WuiButtonColor } from "../WuiButton/WuiButton.props";
import { WuiTooltip } from "./WuiTooltip";
import { WuiTooltipPlacement } from "./WuiTooltip.props";

const meta = {
  title: "Components/WuiTooltip",
  component: WuiTooltip,
  parameters: {
    layout: "centered",
    controls: {
      expanded: true,
      sort: "requiredFirst",
    },
  },
  tags: ["!autodocs"],
  argTypes: {
    content: {
      description: "Content shown in the tooltip when hovering the trigger.",
      control: "text",
      table: {
        type: { summary: "ReactNode" },
      },
    },
    placement: {
      control: "select",
      options: Object.values(WuiTooltipPlacement),
      table: {
        type: { summary: "WuiTooltipPlacement" },
        defaultValue: { summary: "WuiTooltipPlacement.TOP" },
      },
    },
    children: {
      description: "Trigger element(s). Tooltip shows on hover.",
      table: {
        type: { summary: "ReactNode" },
      },
    },
    className: {
      description: "Additional CSS classes to apply to the root element.",
      control: "text",
      table: {
        type: { summary: "string" },
      },
    },
  },
} satisfies Meta<typeof WuiTooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Component: Story = {
  args: {
    content: "Tooltip text",
    children: <WuiButton color={WuiButtonColor.SECONDARY}>Hover me</WuiButton>,
  },
};

export const AllPlacements: Story = {
  args: {
    content: "",
    children: null,
  },
  tags: ["!dev"],
  parameters: {
    docsOnly: true,
    controls: { disable: true },
  },
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "4rem",
        padding: "4rem",
      }}
    >
      <WuiTooltip content="Tooltip on top" placement={WuiTooltipPlacement.TOP}>
        <WuiButton color={WuiButtonColor.SECONDARY}>Top</WuiButton>
      </WuiTooltip>

      <div style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
        <WuiTooltip
          content="Tooltip on left"
          placement={WuiTooltipPlacement.LEFT}
        >
          <WuiButton color={WuiButtonColor.SECONDARY}>Left</WuiButton>
        </WuiTooltip>

        <WuiTooltip
          content="Tooltip on right"
          placement={WuiTooltipPlacement.RIGHT}
        >
          <WuiButton color={WuiButtonColor.SECONDARY}>Right</WuiButton>
        </WuiTooltip>
      </div>

      <WuiTooltip
        content="Tooltip on bottom"
        placement={WuiTooltipPlacement.BOTTOM}
      >
        <WuiButton color={WuiButtonColor.SECONDARY}>Bottom</WuiButton>
      </WuiTooltip>
    </div>
  ),
};
