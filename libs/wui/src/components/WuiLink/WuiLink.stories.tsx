import type { Meta, StoryObj } from "@storybook/react";

import { WuiColorAlias } from "../..";
import { WuiColorValue } from "../..";
import { WuiText, WuiTextAs } from "../WuiText";
import { WuiTitle, WuiTitleAs, WuiTitleLook } from "../WuiTitle";
import { WuiLink } from "./WuiLink";
import { WuiLinkColor, WuiLinkSize } from "./WuiLink.props";

const meta = {
  title: "Components/Typography/WuiLink",
  component: WuiLink,
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
      options: Object.values(WuiLinkColor),
      table: {
        type: { summary: "WuiLinkColor" },
        defaultValue: { summary: "WuiLinkColor.NONE" },
      },
    },
    size: {
      control: "select",
      options: Object.values(WuiLinkSize),
      table: {
        type: { summary: "WuiLinkSize" },
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
} satisfies Meta<typeof WuiLink>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Component: Story = {
  args: {
    children: "I'm a link",
    href: "https://www.google.com",
    target: "_blank",
  },
};

export const Example: Story = {
  parameters: {
    layout: "padded",
    controls: { disable: true },
  },
  render: () => (
    <div>
      <WuiTitle as={WuiTitleAs.H1} look={WuiTitleLook.H1}>
        Links examples
      </WuiTitle>

      <WuiTitle as={WuiTitleAs.H2} look={WuiTitleLook.H3}>
        Links in text
      </WuiTitle>

      <WuiText as={WuiTextAs.P}>
        Lorem ipsum dolor sit amet,{" "}
        <WuiLink href="https://www.lipsum.com" target="_blank">
          consectetur adipiscing elit
        </WuiLink>
        . Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      </WuiText>

      <WuiText
        as={WuiTextAs.P}
        color={WuiColorAlias.NEUTRAL_0}
        style={{ padding: "1rem", backgroundColor: WuiColorValue.BLACK_900 }}
      >
        Lorem ipsum dolor sit amet,{" "}
        <WuiLink href="https://www.lipsum.com" target="_blank">
          consectetur adipiscing elit
        </WuiLink>
        . Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      </WuiText>

      <WuiTitle as={WuiTitleAs.H2} look={WuiTitleLook.H3}>
        Button links
      </WuiTitle>

      {Object.values(WuiLinkColor)
        .filter((color) => color !== WuiLinkColor.NONE)
        .map((color) => (
          <>
            <WuiLink
              key={color}
              href="https://www.lipsum.com"
              target="_blank"
              color={color}
            >
              {color}
            </WuiLink>

            <br />
            <br />
          </>
        ))}
    </div>
  ),
};
