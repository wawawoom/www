import type { Meta, StoryObj } from "@storybook/react";

import { WuiInput } from "./WuiInput";
import { WuiInputHeight, WuiInputStatus } from "./WuiInput.props";

const meta = {
  title: "Components/WuiInput",
  component: WuiInput,
  parameters: {
    layout: "centered",
    controls: {
      expanded: true,
      sort: "requiredFirst",
    },
  },
  tags: ["!autodocs"],
  argTypes: {
    height: {
      control: "select",
      options: Object.values(WuiInputHeight),
      table: {
        type: { summary: "WuiInputHeight" },
        defaultValue: { summary: "WuiInputHeight.M" },
      },
    },
    status: {
      control: "select",
      options: Object.values(WuiInputStatus),
      table: {
        type: { summary: "WuiInputStatus" },
        defaultValue: { summary: "WuiInputStatus.DEFAULT" },
      },
    },
    label: {
      description:
        "Label text; when set, a <label> is rendered and associated with the input.",
      control: "text",
      table: {
        type: { summary: "string" },
      },
    },
    placeholder: {
      control: "text",
      table: {
        type: { summary: "string" },
      },
    },
    disabled: {
      control: "boolean",
    },
    className: {
      description: "Additional CSS classes to apply to the component.",
      control: "text",
      table: {
        type: { summary: "string" },
      },
    },
  },
} satisfies Meta<typeof WuiInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Component: Story = {
  args: {
    placeholder: "Enter text...",
  },
};
