import type { Meta, StoryObj } from "@storybook/react";

import { WuiInput } from "../components/WuiInput/WuiInput";
import { WuiSelect } from "../components/WuiSelect/WuiSelect";
import { WuiText } from "../components/WuiText/WuiText";
import { WuiTextAs, WuiTextSize } from "../components/WuiText/WuiText.props";
import { WuiTitle } from "../components/WuiTitle/WuiTitle";
import {
  WuiTitleAs,
  WuiTitleLook,
} from "../components/WuiTitle/WuiTitle.props";

const meta = {
  title: "Components/Form",
  parameters: {
    controls: { disable: true },
  },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const FormExample: Story = {
  tags: ["!dev"],
  parameters: {
    docsOnly: true,
  },
  render: () => (
    <div style={{ maxWidth: "800px", margin: "0 auto" }}>
      <WuiTitle as={WuiTitleAs.H1} look={WuiTitleLook.H1}>
        Form example
      </WuiTitle>

      <WuiText size={WuiTextSize.M} as={WuiTextAs.P}>
        This form demonstrates all available field types: text, password,
        number, select, checkbox and radio.
      </WuiText>

      <form
        onSubmit={(e) => e.preventDefault()}
        style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}
      >
        <WuiInput
          type="text"
          label="Username"
          placeholder="Enter your name"
          name="username"
        />

        <WuiInput
          type="password"
          label="Password"
          placeholder="Enter your password"
          name="password"
        />

        <WuiInput
          type="password"
          label="Password"
          placeholder="Repeat your password"
          name="password-repeat"
        />

        <WuiInput
          type="email"
          label="Email"
          placeholder="you@gmail.com"
          name="email"
          helpers={[
            {
              message: "We only accept Gmail addresses",
            },
          ]}
        />

        <WuiInput
          type="number"
          label="Street number"
          placeholder="23"
          name="street-number"
          min={0}
          max={100}
        />

        <WuiSelect label="Country" name="country">
          <option value="">Choose a country</option>
          <option value="fr">France</option>
          <option value="de">Germany</option>
          <option value="uk">United Kingdom</option>
        </WuiSelect>

        <div>
          <WuiText
            size={WuiTextSize.S}
            as={WuiTextAs.P}
            style={{ marginBottom: "0.5rem", fontWeight: 600 }}
          >
            Choose an option
          </WuiText>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
          >
            <WuiInput
              type="radio"
              name="option"
              value="a"
              label="Option A"
              id="option-a"
              defaultChecked
            />
            <WuiInput
              type="radio"
              name="option"
              value="b"
              label="Option B"
              id="option-b"
            />
            <WuiInput
              type="radio"
              name="option"
              value="c"
              label="Option C"
              id="option-c"
            />
          </div>
        </div>

        <WuiInput
          type="checkbox"
          label="I accept the terms of use"
          name="terms"
          id="terms"
        />
      </form>
    </div>
  ),
};
