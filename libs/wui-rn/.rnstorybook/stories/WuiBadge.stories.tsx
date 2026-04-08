import React from "react";

import type { Meta, StoryObj } from "@storybook/react-native";

import {
  WuiBadge,
  WuiBadgeColor,
  WuiBadgeSize,
} from "../../src/components/WuiBadge";
import { StoryContainer } from "./StoryContainer";

const meta = {
  title: "WUI/WuiBadge",
  component: WuiBadge,
  decorators: [
    (Story) => (
      <StoryContainer>
        <Story />
      </StoryContainer>
    ),
  ],
  tags: ["autodocs"],
  args: {
    label: "This is a badge",
    size: WuiBadgeSize.M,
    color: WuiBadgeColor.SECONDARY,
  },
  argTypes: {
    label: {
      control: { type: "text" },
      table: {
        type: { summary: "string" },
      },
    },
    size: {
      control: { type: "select" },
      options: Object.values(WuiBadgeSize),
      table: {
        type: { summary: "WuiBadgeSize" },
        defaultValue: { summary: "WuiBadgeSize.M" },
      },
    },
    color: {
      control: { type: "select" },
      options: Object.values(WuiBadgeColor),
      table: {
        type: { summary: "WuiBadgeColor" },
        defaultValue: { summary: "WuiBadgeColor.SECONDARY" },
      },
    },
    leftIconName: {
      control: { type: "text" },
      table: {
        type: { summary: "string (FontAwesome name)" },
      },
    },
  },
} satisfies Meta<typeof WuiBadge>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Component: Story = {
  args: {
    label: "This is a badge",
    leftIconName: "star",
  },
};
