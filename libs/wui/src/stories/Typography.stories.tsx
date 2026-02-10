import type { Meta, StoryObj } from "@storybook/react";

import { WuiText } from "../components/WuiText/WuiText";
import {
  WuiTextAs,
  WuiTextSize,
  WuiTextWeight,
} from "../components/WuiText/WuiText.props";
import { WuiTitle } from "../components/WuiTitle/WuiTitle";
import {
  WuiTitleAs,
  WuiTitleLook,
} from "../components/WuiTitle/WuiTitle.props";

const meta = {
  title: "Components/Typography",
  parameters: {
    controls: { disable: true },
  },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

/** Story for embedding in the Typography Docs page (styles applied via Canvas) */
export const DocumentExample: Story = {
  tags: ["!dev"],
  parameters: {
    docsOnly: true,
  },
  render: () => (
    <div style={{ maxWidth: "800px", margin: "0 auto" }}>
      <WuiTitle as={WuiTitleAs.H1} look={WuiTitleLook.H1}>
        Document example
      </WuiTitle>

      <WuiText size={WuiTextSize.L} as={WuiTextAs.P}>
        This is an introduction in size L that presents the main subject of the
        document.
      </WuiText>

      <WuiTitle as={WuiTitleAs.H2} look={WuiTitleLook.H2}>
        Main section
      </WuiTitle>

      <WuiText size={WuiTextSize.M} as={WuiTextAs.P}>
        This paragraph uses size M, which is the default size for body text. It
        offers optimal readability for long-form content.
      </WuiText>

      <WuiText as={WuiTextAs.P}>
        A second paragraph to illustrate text flow and show how multiple
        paragraphs follow one another in a structured document.
      </WuiText>

      <WuiTitle as={WuiTitleAs.H3} look={WuiTitleLook.H3}>
        Subsection with different formats
      </WuiTitle>

      <WuiText weight={WuiTextWeight.BOLD} as={WuiTextAs.P}>
        This text is bold to highlight an important point.
      </WuiText>

      <WuiText as={WuiTextAs.P}>
        And this text returns to normal to continue the content.
      </WuiText>

      <WuiText size={WuiTextSize.S} as={WuiTextAs.P}>
        This smaller text can be used for notes or additional information.
      </WuiText>

      <WuiTitle as={WuiTitleAs.H4} look={WuiTitleLook.H4}>
        Further details
      </WuiTitle>

      <WuiText as={WuiTextAs.P}>
        This section uses an H4 heading to organize the content in a
        hierarchical way.
      </WuiText>

      <WuiTitle as={WuiTitleAs.H5} look={WuiTitleLook.H5}>
        Detail point
      </WuiTitle>

      <WuiText size={WuiTextSize.XS} as={WuiTextAs.P}>
        XS text for annotations or minor clarifications.
      </WuiText>

      <WuiTitle as={WuiTitleAs.H6} look={WuiTitleLook.H6}>
        Final note
      </WuiTitle>

      <WuiText size={WuiTextSize.XXS} as={WuiTextAs.P}>
        A very subtle XXS note to complete the information.
      </WuiText>
    </div>
  ),
};
