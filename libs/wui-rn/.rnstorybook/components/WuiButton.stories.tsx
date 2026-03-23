import React from "react";

import type { Meta, StoryObj } from "@storybook/react-native";
import { fn } from "storybook/test";

import { WuiButton } from "../../src/components/WuiButton";
import {
  WuiButtonColor,
  WuiButtonSize,
} from "../../src/components/WuiButton/WuiButtonProps";
import { StoryContainer } from "./StoryContainer";

const meta = {
  title: "WUI/WuiButton",
  component: WuiButton,
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
    label: "Button",
    color: WuiButtonColor.PRIMARY,
    block: false,
    size: WuiButtonSize.M,
  },
  argTypes: {
    color: {
      control: { type: "select" },
      options: Object.values(WuiButtonColor),
    },
    size: {
      control: { type: "select" },
      options: Object.values(WuiButtonSize),
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
