import React from "react";
import { View } from "react-native";

import type { Meta, StoryObj } from "@storybook/react-native";
import { fn } from "storybook/test";

import { WuiColorAlias } from "@wawawoom/design-token/enum";

import {
  WuiTitle,
  WuiTitleAs,
  WuiTitleLook,
} from "../../src/components/WuiTitle";
import { StoryContainer } from "./StoryContainer";

/** Must match `mapping` below — on-device controls may fall back to a text field; keep one source of truth. */
const LOOK_FOLLOWS_AS_LABEL = 'Same size as "as" (default)' as const;

const meta = {
  title: "WUI/WuiTitle",
  component: WuiTitle,
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
    as: WuiTitleAs.H1,
    look: undefined,
    color: WuiColorAlias.NEUTRAL_900,
    children: "The quick brown fox jumps over the lazy dog.",
  },
  argTypes: {
    children: {
      control: { type: "text" },
    },
    as: {
      control: { type: "select" },
      options: Object.values(WuiTitleAs),
      table: {
        type: { summary: "WuiTitleAs" },
        defaultValue: { summary: "WuiTitleAs.H1" },
      },
    },
    look: {
      control: { type: "select" },
      options: [LOOK_FOLLOWS_AS_LABEL, ...Object.values(WuiTitleLook)],
      mapping: {
        [LOOK_FOLLOWS_AS_LABEL]: undefined,
        h1: WuiTitleLook.H1,
        h2: WuiTitleLook.H2,
        h3: WuiTitleLook.H3,
        h4: WuiTitleLook.H4,
        h5: WuiTitleLook.H5,
        h6: WuiTitleLook.H6,
      },
      table: {
        type: { summary: "WuiTitleLook | undefined" },
        defaultValue: { summary: "undefined" },
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
} satisfies Meta<typeof WuiTitle>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Component: Story = {};

export const All: Story = {
  render: () => (
    <View style={{ gap: 16, width: "100%" }}>
      {Object.values(WuiTitleLook).map((look) => (
        <WuiTitle key={look} as={WuiTitleAs.H1} look={look}>
          {look} — The quick brown fox jumps over the lazy dog.
        </WuiTitle>
      ))}
    </View>
  ),
};
