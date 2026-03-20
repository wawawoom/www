import React from "react";
import { View } from "react-native";

import type { Meta, StoryObj } from "@storybook/react-native";
import { fn } from "storybook/test";

import { WuiButtonColor } from "../../../src/components/WuiButton/WuiButtonProps";
import { WuiButton } from "./WuiButton";

const meta = {
  title: "WUI/WuiButton",
  component: WuiButton,
  decorators: [
    (Story) => (
      <View style={{ flex: 1, alignItems: "flex-start", padding: 20 }}>
        <Story />
      </View>
    ),
  ],
  tags: ["autodocs"],
  args: {
    onPress: fn(),
    label: "Button",
    color: WuiButtonColor.PRIMARY,
    block: false,
  },
  argTypes: {
    color: {
      control: { type: "select" },
      options: Object.values(WuiButtonColor),
    },
    block: {
      control: { type: "boolean" },
    },
    disabled: {
      control: { type: "boolean" },
    },
  },
} satisfies Meta<typeof WuiButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Component: Story = {};
