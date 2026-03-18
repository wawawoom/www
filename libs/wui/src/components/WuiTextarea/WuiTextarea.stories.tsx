import type { Meta, StoryObj } from "@storybook/react";

import { WuiInputHelperStatus } from "../WuiInputHelper/WuiInputHelper.props";
import { WuiTextarea } from "./WuiTextarea";
import { WuiTextareaHeight, WuiTextareaStatus } from "./WuiTextarea.props";

const meta = {
  title: "Components/Form/WuiTextarea",
  component: WuiTextarea,
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
      options: Object.values(WuiTextareaHeight),
      table: {
        type: { summary: "WuiTextareaHeight" },
        defaultValue: { summary: "WuiTextareaHeight.M" },
      },
    },
    status: {
      control: "select",
      options: Object.values(WuiTextareaStatus),
      table: {
        type: { summary: "WuiTextareaStatus" },
        defaultValue: { summary: "WuiTextareaStatus.DEFAULT" },
      },
    },
    label: {
      description:
        "Label text; when set, a <label> is rendered and associated with the textarea.",
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
    rows: {
      description: "Native HTML rows attribute (number of visible lines).",
      control: { type: "number", min: 2, max: 20 },
      table: {
        type: { summary: "number" },
      },
    },
    className: {
      description: "Additional CSS classes to apply to the component.",
      control: "text",
      table: {
        type: { summary: "string" },
      },
    },
    helpers: {
      description:
        "Optional array of helper items { message, status? } to show hint or validation messages under the textarea (WuiInputHelper).",
      control: false,
      table: {
        type: {
          summary: "Array<{ message: string; status?: WuiInputHelperStatus }>",
        },
      },
    },
  },
} satisfies Meta<typeof WuiTextarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Component: Story = {
  args: {
    label: "Message",
    placeholder: "Enter your message...",
    rows: 4,
  },
};

export const WithHelpers: Story = {
  args: {
    label: "Description",
    placeholder: "Describe your project...",
    rows: 5,
    helpers: [
      {
        status: WuiInputHelperStatus.DEFAULT,
        message: "Maximum 500 characters.",
      },
    ],
  },
};

export const Error: Story = {
  args: {
    label: "Comment",
    placeholder: "Your comment",
    status: WuiTextareaStatus.ERROR,
    defaultValue: "Too short",
    helpers: [
      {
        status: WuiInputHelperStatus.ERROR,
        message: "Comment must be at least 10 characters.",
      },
    ],
  },
};

export const Valid: Story = {
  args: {
    label: "Bio",
    placeholder: "Tell us about yourself",
    status: WuiTextareaStatus.VALID,
    defaultValue: "Senior developer with 10+ years of experience.",
    helpers: [
      {
        status: WuiInputHelperStatus.VALID,
        message: "Looks good.",
      },
    ],
  },
};
