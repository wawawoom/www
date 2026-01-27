import type { Meta, StoryObj } from "@storybook/react";

import { loremIpsum } from "../../utils/lorem-ipsum";

import { WuiColorName } from "../../enum";

import { WuiText } from "./WuiText";
import { WuiTextAs, WuiTextSize, WuiTextWeight } from "./WuiText.props";

const meta = {
  title: "Components/Typography/WuiText",
  component: WuiText,
  parameters: {
    layout: "centered",
    controls: {
      expanded: true,
      sort: 'requiredFirst',
    },
  },
  tags: ["!autodocs"],
  argTypes: {
    as: {
      description: "HTML tag to use for the component.",
      control: "select",
      options: Object.values(WuiTextAs),
      table: {
        type: { summary: "WuiTextAs" },
        defaultValue: { summary: "WuiTextAs.DIV" },
      },
    },
    size: {
      description: "Text size.",
      control: "select",
      options: Object.values(WuiTextSize),
      table: {
        type: { summary: "WuiTextSize" },
        defaultValue: { summary: "WuiTextSize.M" },
      },
    },
    weight: {
      description: "Text weight.",
      control: "select",
      options: Object.values(WuiTextWeight),
      table: {
        type: { summary: "WuiTextWeight" },
        defaultValue: { summary: "WuiTextWeight.NORMAL" },
      },
    },
    color: {
      description: "Text color.",
      control: "select",
      options: Object.values(WuiColorName),
      table: {
        type: { summary: "WuiColorName" },
        defaultValue: { summary: "-" },
      },
    },
    children: {
      description: "Text content to display.",
      control: "text",
      table: {
        type: { summary: "ReactNode" },
        defaultValue: { summary: "-" },
      },
    },
    className: {
      description: "Additional CSS classes to apply to the component.",
      control: "text",
      table: {
        type: { summary: "string" },
      },
    },
  },
} satisfies Meta<typeof WuiText>;

export default meta;

type Story = StoryObj<typeof meta>;


export const Component: Story = {
  args: {
    as: WuiTextAs.P,
    size: WuiTextSize.M,
    children: loremIpsum(50),
  },
};

export const All: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div>
      {Object.values(WuiTextSize).map((size) => (
        <WuiText key={size} as={WuiTextAs.DIV} size={size}>
          {size} / Portez ce vieux whisky au juge blond qui fume.
        </WuiText>
      ))}
    </div>
  ),
};