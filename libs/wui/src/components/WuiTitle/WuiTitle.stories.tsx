import type { Meta, StoryObj } from "@storybook/react";

import { WuiTitle } from "./WuiTitle";
import { WuiTitleAs, WuiTitleLook } from "./WuiTitle.props";
import { WuiColorName } from "../../enum";

const meta = {
  title: "Components/Typography/WuiTitle",
  component: WuiTitle,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    as: {
      control: "select",
      options: Object.values(WuiTitleAs),
    },
    look: {
      control: "select",
      options: Object.values(WuiTitleLook),
    },
    color: {
      control: "select",
      options: Object.values(WuiColorName),
    },
  },
} satisfies Meta<typeof WuiTitle>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Component: Story = {
  args: {
    as: WuiTitleAs.H1,
    children: "Portez ce vieux whisky au juge blond qui fume.",
  },
};

export const All: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div>
      {Object.values(WuiTitleLook).map((look) => (
        <WuiTitle key={look} as={WuiTitleAs.H1} look={look}>
          {look} / Portez ce vieux whisky au juge blond qui fume.
        </WuiTitle>
      ))}

    </div>
  ),
};
