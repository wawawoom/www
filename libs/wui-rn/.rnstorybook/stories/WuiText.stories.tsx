import React from "react";

import type { Meta, StoryObj } from "@storybook/react-native";
import { fn } from "storybook/test";

import { WuiColorAlias } from "@wawawoom/design-token/enum";

import {
  WuiFontFamily,
  WuiText,
  WuiTextSize,
  WuiTextWeight,
} from "../../src/components/WuiText";
import { StoryContainer } from "./StoryContainer";

const meta = {
  title: "WUI/WuiText",
  component: WuiText,
  decorators: [
    (Story) => (
      <StoryContainer>
        <Story />
      </StoryContainer>
    ),
  ],
  tags: ["autodocs"],
  args: {
    onPress: fn(),
    fontFamily: WuiFontFamily.SERIF,
    size: WuiTextSize.M,
    weight: WuiTextWeight.REGULAR,
    color: WuiColorAlias.NEUTRAL_900,
    children:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  argTypes: {
    children: {
      control: { type: "text" },
    },
    fontFamily: {
      control: { type: "select" },
      options: Object.values(WuiFontFamily),
      table: {
        type: { summary: "WuiFontFamily" },
        defaultValue: { summary: "WuiFontFamily.SERIF" },
      },
    },
    size: {
      control: { type: "select" },
      options: Object.values(WuiTextSize),
      table: {
        type: { summary: "WuiTextSize" },
        defaultValue: { summary: "WuiTextSize.M" },
      },
    },
    weight: {
      control: { type: "select" },
      options: Object.values(WuiTextWeight),
      table: {
        type: { summary: "WuiTextWeight" },
        defaultValue: { summary: "WuiTextWeight.REGULAR" },
      },
    },
    color: {
      control: { type: "select" },
      options: Object.values(WuiColorAlias),
      table: {
        type: { summary: "WuiColorAlias" },
        defaultValue: { summary: "WuiColorAlias.NEUTRAL_900" },
      },
    },
  },
} satisfies Meta<typeof WuiText>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Component: Story = {};
