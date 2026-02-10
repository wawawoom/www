import type { Meta, StoryObj } from "@storybook/react";

import { WuiButton } from "./WuiButton";
import { WuiButtonColor, WuiButtonSize } from "./WuiButton.props";
import { WuiTitle } from "../WuiTitle/WuiTitle";
import { WuiTitleAs, WuiTitleLook } from "../..";

const meta = {
  title: "Components/WuiButton",
  component: WuiButton,
  parameters: {
    layout: "centered",
    controls: {
      expanded: true,
      sort: "requiredFirst",
    },
  },
  tags: ["!autodocs"],
  argTypes: {
    color: {
      control: "select",
      options: Object.values(WuiButtonColor),
      table: {
        type: { summary: "WuiButtonColor" },
        defaultValue: { summary: "WuiButtonColor.LIGHT" },
      },
    },
    size: {
      control: "select",
      options: Object.values(WuiButtonSize),
      table: {
        type: { summary: "WuiButtonSize" },
        defaultValue: { summary: "WuiButtonSize.M" },
      },
    },
    disabled: {
      control: "boolean",
    },
    block: {
      control: "boolean",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    leftIcon: {
      control: "text",
      description: "Icon to display on the left of the children. Use the font-awesome classes.<br />Example: fa-solid fa-arrow-left",
      table: {
        type: { summary: "string" },
      },
    },
    rightIcon: {
      control: "text",
      description: "Icon to display on the right of the children. Use the font-awesome classes.<br />Example: fa-solid fa-arrow-right",
      table: {
        type: { summary: "string" },
      },
    },
    children: {
      control: "text",
      table: {
        type: { summary: "ReactNode" },
        defaultValue: { summary: "Button" },
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
} satisfies Meta<typeof WuiButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Component: Story = {
  args: {
    children: "I'm a button",
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
      <WuiTitle as={WuiTitleAs.H2} look={WuiTitleLook.H5}>WuiButton at WuiButtonSize.L:</WuiTitle>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", alignItems: "center", marginBottom: "3rem" }}>
        {Object.values(WuiButtonColor).map((color) => (
          <WuiButton key={color} color={color} size={WuiButtonSize.L} >
            {color}
          </WuiButton>
        ))
        }
      </div>

      <WuiTitle as={WuiTitleAs.H2} look={WuiTitleLook.H5}>WuiButton at WuiButtonSize.M (default):</WuiTitle>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", alignItems: "center", marginBottom: "3rem" }}>
        {
          Object.values(WuiButtonColor).map((color) => (
            <WuiButton key={color} color={color} >
              {color}
            </WuiButton>
          ))
        }
      </div>

      <WuiTitle as={WuiTitleAs.H2} look={WuiTitleLook.H5}>WuiButton at WuiButtonSize.S :</WuiTitle>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", alignItems: "center", marginBottom: "3rem" }}>
        {
          Object.values(WuiButtonColor).map((color) => (
            <WuiButton key={color} color={color} size={WuiButtonSize.S}>
              {color}
            </WuiButton>
          ))
        }
      </div>
    </div>
  ),
};
