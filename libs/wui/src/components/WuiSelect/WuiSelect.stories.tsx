import type { Meta, StoryObj } from "@storybook/react";

import { WuiInputHelperStatus } from "../WuiInputHelper/WuiInputHelper.props";
import { WuiSelect } from "./WuiSelect";
import { WuiSelectHeight, WuiSelectStatus } from "./WuiSelect.props";

const meta = {
  title: "Components/Form/WuiSelect",
  component: WuiSelect,
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
      options: Object.values(WuiSelectHeight),
      table: {
        type: { summary: "WuiSelectHeight" },
        defaultValue: { summary: "WuiSelectHeight.M" },
      },
    },
    status: {
      control: "select",
      options: Object.values(WuiSelectStatus),
      table: {
        type: { summary: "WuiSelectStatus" },
        defaultValue: { summary: "WuiSelectStatus.DEFAULT" },
      },
    },
    label: {
      description:
        "Label text; when set, a <label> is rendered and associated with the select.",
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
        "Optional array of helper items { message, status? } to show hint or validation messages under the select.",
      control: false,
      table: {
        type: {
          summary: "Array<{ message: string; status?: WuiInputHelperStatus }>",
        },
      },
    },
  },
} satisfies Meta<typeof WuiSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultOptions = (
  <>
    <option value="">Choose an option</option>
    <option value="a">Option A</option>
    <option value="b">Option B</option>
    <option value="c">Option C</option>
  </>
);

export const Component: Story = {
  args: {
    label: "Country",
    children: defaultOptions,
    helpers: [
      {
        status: WuiInputHelperStatus.DEFAULT,
        message: "Select your country of residence.",
      },
    ],
  },
  render: (args) => <WuiSelect {...args}>{defaultOptions}</WuiSelect>,
};
