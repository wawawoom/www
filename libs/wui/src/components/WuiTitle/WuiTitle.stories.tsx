import type { Meta, StoryObj } from "@storybook/react";

import { WuiTitle } from "./WuiTitle";
import { WuiTitleAs, WuiTitleLook } from "./WuiTitle.props";

const meta = {
  title: "Components/WuiTitle",
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
  render: () => (
    <div>
      <WuiTitle as={WuiTitleAs.H1}>
        H1 / Portez ce vieux whisky au juge blond qui fume.
      </WuiTitle>

      <WuiTitle as={WuiTitleAs.H2}>
        H2 / Portez ce vieux whisky au juge blond qui fume.
      </WuiTitle>

      <WuiTitle as={WuiTitleAs.H3}>
        H3 / Portez ce vieux whisky au juge blond qui fume.
      </WuiTitle>

      <WuiTitle as={WuiTitleAs.H4}>
        H4 / Portez ce vieux whisky au juge blond qui fume.
      </WuiTitle>

      <WuiTitle as={WuiTitleAs.H5}>
        H5 / Portez ce vieux whisky au juge blond qui fume.
      </WuiTitle>

      <WuiTitle as={WuiTitleAs.H6}>
        H6 / Portez ce vieux whisky au juge blond qui fume.
      </WuiTitle>
    </div>
  ),
};
