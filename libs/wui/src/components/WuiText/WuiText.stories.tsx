import type { Meta, StoryObj } from "@storybook/react";

import { loremIpsum } from "../../utils/lorem-ipsum";
import { WuiText } from "./WuiText";
import { WuiTextAs, WuiTextSize, WuiTextWeight } from "./WuiText.props";

const meta = {
  title: "Components/WuiText",
  component: WuiText,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    as: {
      control: "select",
      options: Object.values(WuiTextAs),
    },
    size: {
      control: "select",
      options: Object.values(WuiTextSize),
    },
    weight: {
      control: "select",
      options: Object.values(WuiTextWeight),
    },
  },
} satisfies Meta<typeof WuiText>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Component: Story = {
  args: {
    as: WuiTextAs.P,
    children: loremIpsum(50),
  },
};

export const TextExample: Story = {
  render: () => (
    <div>
      <WuiText as={WuiTextAs.DIV}>
        Portez ce vieux whisky au juge blond qui fume. (div)
      </WuiText>
      <WuiText as={WuiTextAs.P}>
        Portez ce vieux whisky au juge blond qui fume. (p)
      </WuiText>
      <WuiText as={WuiTextAs.SPAN}>
        Portez ce vieux whisky au juge blond qui fume. (span)
      </WuiText>
    </div>
  ),
};
