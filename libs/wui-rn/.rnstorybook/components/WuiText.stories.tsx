import React from "react";

import type { Meta, StoryObj } from "@storybook/react-native";
import { fn } from "storybook/test";

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
    children:
      "Text uh group eqpirfug epsoiurpiurgfp iesurg prouver sprouts piesrg pvegu rifg Text uh group eqpirfug epsoiurpiurgfp iesurg prouver sprouts piesrg pvegu rifg Text uh group eqpirfug epsoiurpiurgfp iesurg prouver sprouts piesrg pvegu rifg oh gopher proud erpo hv epithet poesurh phoebes pics pei répond donc pieux ouest vu epsiorub vpidgu Spirit pesiru gpuerpvig espoir gvpisdgv piugdsprivpdofu gbpd gpviuhs psi truc ^dosh vpiudgs fpivpouidshr pouch eu pseudo gipvugd fpsiuvgpdsiufvpodus fpovudpsouf hpvouhdfissh",
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
        defaultValue: { summary: "WuiTextWeight.NORMAL" },
      },
    },
  },
} satisfies Meta<typeof WuiText>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Component: Story = {};
