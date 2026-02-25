import type { Meta, StoryObj } from "@storybook/react";

import { WuiInputHelper } from "./WuiInputHelper";
import { WuiInputHelperStatus } from "./WuiInputHelper.props";

const meta = {
  title: "Components/Form/WuiInputHelper",
  component: WuiInputHelper,
  parameters: {
    layout: "centered",
    controls: {
      expanded: true,
      sort: "requiredFirst",
    },
  },
  tags: ["!autodocs"],
  argTypes: {
    status: {
      description:
        "Visual status: default (info, gray), error (x, danger), valid (check, success).",
      control: "select",
      options: Object.values(WuiInputHelperStatus),
      table: {
        type: { summary: "WuiInputHelperStatus" },
        defaultValue: { summary: "WuiInputHelperStatus.DEFAULT" },
      },
    },
    message: {
      description: "Helper text displayed next to the icon.",
      control: "text",
      table: {
        type: { summary: "string" },
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
} satisfies Meta<typeof WuiInputHelper>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Component: Story = {
  args: {
    status: WuiInputHelperStatus.DEFAULT,
    message: "Optional hint or instruction for the field above.",
  },
};
