import type { Meta, StoryObj } from "@storybook/react";

import { WuiText, WuiTextAs, WuiTextSize } from "../components/WuiText";
import { WuiTitle, WuiTitleAs } from "../components/WuiTitle";
import { WuiColorName } from "../enum/WuiColorName.enum";
import { WuiColorValue } from "../enum/WuiColorValue.enum";

const meta = {
  title: "Tokens/Core",
  parameters: {
    controls: { disable: true },
    actions: { disable: true },
  },
  argTypes: {},
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Color: Story = {
  render: () => {
    const colors = WuiColorValue;
    // const colorNames = Object.keys(colors) as Array<keyof typeof colors>;
    // const colorEntries: Array<{
    //   colorName: string;
    //   shade: string;
    //   value: string;
    // }> = [];

    console.log({ colors });

    return (
      <div>
        <WuiTitle>Colors</WuiTitle>

        <WuiTitle as={WuiTitleAs.H2}>Color Values</WuiTitle>

        <WuiText as={WuiTextAs.P}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </WuiText>
        <div
          style={{ display: "grid", gridTemplateColumns: "repeat(10, 1fr)" }}
        >
          {Object.values(WuiColorName).map((color) => {
            console.log({ color });

            return (
              <div
                key={color}
                style={{
                  width: "100px",
                  height: "100px",
                  backgroundColor: `var(--wui-color-${color})`,
                }}
              >
                <WuiText>{color}</WuiText>
              </div>
            );
          })}
        </div>
      </div>
    );

    colorNames.forEach((colorName) => {
      const colorPalette = colors[colorName];
      Object.entries(colorPalette).forEach(([shade, colorData]) => {
        if (
          colorData &&
          typeof colorData === "object" &&
          "value" in colorData
        ) {
          colorEntries.push({
            colorName: colorName as string,
            shade: shade.trim(),
            value: colorData.value as string,
          });
        }
      });
    });

    // Sort by color name, then by shade number
    colorEntries.sort((a, b) => {
      if (a.colorName !== b.colorName) {
        return a.colorName.localeCompare(b.colorName);
      }
      const numA = parseInt(a.shade) || 0;
      const numB = parseInt(b.shade) || 0;
      return numA - numB;
    });

    return (
      <div>
        <WuiTitle>Color</WuiTitle>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginTop: "24px",
          }}
        >
          <thead>
            <tr>
              <th
                style={{
                  textAlign: "left",
                  padding: "12px",
                  borderBottom: "2px solid #e0e0e0",
                }}
              >
                <WuiText size={WuiTextSize.L}>Color</WuiText>
              </th>
              <th
                style={{
                  textAlign: "left",
                  padding: "12px",
                  borderBottom: "2px solid #e0e0e0",
                }}
              >
                <WuiText size={WuiTextSize.L}>Shade</WuiText>
              </th>
              <th
                style={{
                  textAlign: "left",
                  padding: "12px",
                  borderBottom: "2px solid #e0e0e0",
                }}
              >
                <WuiText size={WuiTextSize.L}>Example</WuiText>
              </th>
              <th
                style={{
                  textAlign: "left",
                  padding: "12px",
                  borderBottom: "2px solid #e0e0e0",
                }}
              >
                <WuiText size={WuiTextSize.L}>Value</WuiText>
              </th>
              <th
                style={{
                  textAlign: "left",
                  padding: "12px",
                  borderBottom: "2px solid #e0e0e0",
                }}
              >
                <WuiText size={WuiTextSize.L}>Enum</WuiText>
              </th>
            </tr>
          </thead>

          <tbody>
            {colorEntries.map((entry, index) => (
              <tr key={`${entry.colorName}-${entry.shade}-${index}`}>
                <td
                  style={{ padding: "12px", borderBottom: "1px solid #e0e0e0" }}
                >
                  <WuiText>
                    {entry.colorName.charAt(0).toUpperCase() +
                      entry.colorName.slice(1)}
                  </WuiText>
                </td>
                <td
                  style={{ padding: "12px", borderBottom: "1px solid #e0e0e0" }}
                >
                  <WuiText>{entry.shade}</WuiText>
                </td>
                <td
                  style={{ padding: "12px", borderBottom: "1px solid #e0e0e0" }}
                >
                  <div
                    style={{
                      width: "60px",
                      height: "40px",
                      backgroundColor: entry.value,
                      border: "1px solid #e0e0e0",
                      borderRadius: "4px",
                    }}
                  />
                </td>

                <td
                  style={{
                    padding: "12px",
                    borderBottom: "1px solid #e0e0e0",
                    fontFamily: "monospace",
                  }}
                >
                  <code>{entry.value}</code>
                </td>

                <td
                  style={{
                    padding: "12px",
                    borderBottom: "1px solid #e0e0e0",
                    fontFamily: "monospace",
                  }}
                >
                  <code>
                    WuiColor.{entry.colorName.toUpperCase()}_
                    {entry.shade.toUpperCase()}
                  </code>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  },
};
