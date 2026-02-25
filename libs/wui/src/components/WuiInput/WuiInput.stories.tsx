import type { Meta, StoryObj } from "@storybook/react";

import { WuiInputHelperStatus } from "../WuiInputHelper/WuiInputHelper.props";
import { WuiInput } from "./WuiInput";
import { WuiInputHeight, WuiInputStatus } from "./WuiInput.props";

const meta = {
  title: "Components/Form/WuiInput",
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
    type: {
      description: "Native HTML input type (HTMLInputTypeAttribute).",
      control: "select",
      options: [
        "button",
        "checkbox",
        "color",
        "date",
        "datetime-local",
        "email",
        "file",
        "hidden",
        "image",
        "month",
        "number",
        "password",
        "radio",
        "range",
        "reset",
        "search",
        "submit",
        "tel",
        "text",
        "time",
        "url",
        "week",
      ] as const,
      table: {
        type: { summary: "HTMLInputTypeAttribute" },
        defaultValue: { summary: '"text"' },
      },
    },
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
    helpers: {
      description:
        "Optional array of helper items { message, status? } to show hint or validation messages under the input (WuiInputHelper).",
      control: false,
      table: {
        type: {
          summary: "Array<{ message: string; status?: WuiInputHelperStatus }>",
        },
      },
    },
  },
} satisfies Meta<typeof WuiInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Component: Story = {
  args: {
    label: "Email",
    type: "email",
    placeholder: "you@example.com",
    helpers: [
      {
        status: WuiInputHelperStatus.DEFAULT,
        message: "We will never share your email with anyone else.",
      },
    ],
  },
};
