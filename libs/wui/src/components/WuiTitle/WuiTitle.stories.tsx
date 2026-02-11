import type { Meta, StoryObj } from "@storybook/react";

import { WuiColorAlias } from "../../enum";
import { WuiTitle } from "./WuiTitle";
import { WuiTitleAs, WuiTitleLook } from "./WuiTitle.props";

const meta = {
  title: "Components/Typography/WuiTitle",
  component: WuiTitle,
  parameters: {
    layout: "centered",
    controls: {
      expanded: true,
      sort: "requiredFirst",
    },
  },
  tags: ["!autodocs"],
  argTypes: {
    as: {
      description: "HTML tag to use for the component.",
      control: "select",
      options: Object.values(WuiTitleAs),
      table: {
        type: { summary: "WuiTitleAs" },
        defaultValue: { summary: "WuiTitleAs.H1" },
      },
    },
    look: {
      description: "Title look.",
      control: "select",
      options: Object.values(WuiTitleLook),
      table: {
        type: { summary: "WuiTitleLook" },
        defaultValue: { summary: "WuiTitleLook.H1" },
      },
    },
    color: {
      description: "Title color.",
      control: "select",
      options: Object.values(WuiColorAlias),
      table: {
        type: { summary: "WuiColorAlias" },
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
} satisfies Meta<typeof WuiTitle>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Component: Story = {
  args: {
    children: "The quick brown fox jumps over the lazy dog.",
  },
};

export const All: Story = {
  tags: ["!dev"],
  parameters: {
    docsOnly: true,
    controls: { disable: true },
  },
  render: () => (
    <div>
      {Object.values(WuiTitleLook).map((look) => (
        <WuiTitle key={look} as={WuiTitleAs.H1} look={look}>
          {look} / The quick brown fox jumps over the lazy dog.
        </WuiTitle>
      ))}
    </div>
  ),
};
