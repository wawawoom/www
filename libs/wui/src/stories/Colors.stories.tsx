import type { Meta, StoryObj } from "@storybook/react";

import {
  WuiFontFamily,
  WuiText,
  WuiTextAs,
  WuiTextSize,
  WuiTextWeight,
} from "../components/WuiText";
import { WuiTitle, WuiTitleAs } from "../components/WuiTitle";
import { WuiColorAlias } from "../enum/WuiColorAlias.enum";
import { WuiColorName } from "../enum/WuiColorName.enum";
import { WuiColorValue } from "../enum/WuiColorValue.enum";
import "./Colors.css";

const meta = {
  title: "Tokens/Atomic/Colors",
  parameters: {
    controls: { disable: true },
    actions: { disable: true },
  },
  argTypes: {},
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const AtomicColors: Story = {
  tags: ["!dev"],
  parameters: {
    docsOnly: true,
  },
  render: () => {
    const colorValuesEnum = WuiColorValue;
    const colorNamesEnum = WuiColorName;

    const colorNames = Object.keys(colorNamesEnum) as Array<
      keyof typeof colorNamesEnum
    >;

    // Build colors object to display palette
    const colors: {
      [key: string]: {
        token: string;
        name: string;
        value: string;
        shade: string;
      }[];
    } = {};

    colorNames.forEach((colorName) => {
      const extractedName = colorName.split("_")[0];

      if (!colors[extractedName]) {
        colors[extractedName] = [];
      }

      colors[extractedName].push({
        token: colorName,
        name: colorName.split("_")[0].toLowerCase(),
        value: colorValuesEnum[colorName],
        shade: colorName.split("_")[1],
      });
    });

    return (
      <div className="palette-container">
        {Object.keys(colors).map((colorKey, colorIndex) => {
          const color = colors[colorKey];
          console.log({ color });

          return (
            <div key={colorIndex} className="color-token-container">
              <WuiTitle as={WuiTitleAs.H4} className="wui-mt-0">
                {colorKey}
              </WuiTitle>

              <div className="colors-container">
                {color.map((colorItem) => (
                  <div
                    key={colorItem.shade}
                    className="color-item-container"
                    style={{ backgroundColor: colorItem.value }}
                  >
                    <div className="color-item-text">
                      <WuiText>
                        <WuiText
                          size={WuiTextSize.XXS}
                          as={WuiTextAs.DIV}
                          fontFamily={WuiFontFamily.SANS_SERIF}
                          color={
                            parseInt(colorItem.shade, 10) >= 500
                              ? WuiColorAlias.NEUTRAL_0
                              : WuiColorAlias.NEUTRAL_900
                          }
                        >
                          CSS variable
                        </WuiText>

                        <WuiText
                          size={WuiTextSize.XXS}
                          as={WuiTextAs.DIV}
                          fontFamily={WuiFontFamily.SANS_SERIF}
                          className="wui-mb-10"
                          weight={WuiTextWeight.BOLD}
                          color={
                            parseInt(colorItem.shade, 10) >= 500
                              ? WuiColorAlias.NEUTRAL_0
                              : WuiColorAlias.NEUTRAL_900
                          }
                        >
                          var(--wui-color-
                          {`${colorItem.name.toLowerCase()}-${colorItem.shade}`}
                          )
                        </WuiText>
                      </WuiText>

                      <WuiText>
                        <WuiText
                          size={WuiTextSize.XXS}
                          as={WuiTextAs.DIV}
                          fontFamily={WuiFontFamily.SANS_SERIF}
                          color={
                            parseInt(colorItem.shade, 10) >= 500
                              ? WuiColorAlias.NEUTRAL_0
                              : WuiColorAlias.NEUTRAL_900
                          }
                        >
                          Hex value
                        </WuiText>

                        <WuiText
                          size={WuiTextSize.XXS}
                          as={WuiTextAs.DIV}
                          fontFamily={WuiFontFamily.SANS_SERIF}
                          className="wui-mb-10"
                          weight={WuiTextWeight.BOLD}
                          color={
                            parseInt(colorItem.shade, 10) >= 500
                              ? WuiColorAlias.NEUTRAL_0
                              : WuiColorAlias.NEUTRAL_900
                          }
                        >
                          {colorItem.value}
                        </WuiText>
                      </WuiText>

                      <WuiText>
                        <WuiText
                          size={WuiTextSize.XXS}
                          as={WuiTextAs.DIV}
                          fontFamily={WuiFontFamily.SANS_SERIF}
                          color={
                            parseInt(colorItem.shade, 10) >= 500
                              ? WuiColorAlias.NEUTRAL_0
                              : WuiColorAlias.NEUTRAL_900
                          }
                        >
                          CSS classes
                        </WuiText>

                        <WuiText
                          size={WuiTextSize.XXS}
                          as={WuiTextAs.DIV}
                          fontFamily={WuiFontFamily.SANS_SERIF}
                          className="wui-mb-10"
                          weight={WuiTextWeight.BOLD}
                          color={
                            parseInt(colorItem.shade, 10) >= 500
                              ? WuiColorAlias.NEUTRAL_0
                              : WuiColorAlias.NEUTRAL_900
                          }
                        >
                          .wui-bg-
                          {`${colorItem.name.toLowerCase()}-${colorItem.shade}`}
                          <br />
                          .wui-color-
                          {`${colorItem.name.toLowerCase()}-${colorItem.shade}`}
                        </WuiText>
                      </WuiText>

                      <WuiText>
                        <WuiText
                          size={WuiTextSize.XXS}
                          as={WuiTextAs.DIV}
                          fontFamily={WuiFontFamily.SANS_SERIF}
                          color={
                            parseInt(colorItem.shade, 10) >= 500
                              ? WuiColorAlias.NEUTRAL_0
                              : WuiColorAlias.NEUTRAL_900
                          }
                        >
                          Typescript Enum
                        </WuiText>

                        <WuiText
                          size={WuiTextSize.XXS}
                          as={WuiTextAs.DIV}
                          fontFamily={WuiFontFamily.SANS_SERIF}
                          className="wui-mb-10"
                          weight={WuiTextWeight.BOLD}
                          color={
                            parseInt(colorItem.shade, 10) >= 500
                              ? WuiColorAlias.NEUTRAL_0
                              : WuiColorAlias.NEUTRAL_900
                          }
                        >
                          WuiColorName.{colorItem.token.toUpperCase()}
                          <br />
                          WuiColorValue.{colorItem.token.toUpperCase()}
                        </WuiText>
                      </WuiText>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    );

    // colorName.forEach((colorName) => {
    //   const colorPalette = colors[colorName];
    //   Object.entries(colorPalette).forEach(([shade, colorData]) => {
    //     if (
    //       colorData &&
    //       typeof colorData === "object" &&
    //       "value" in colorData
    //     ) {
    //       colorEntries.push({
    //         colorName: colorName as string,
    //         shade: shade.trim(),
    //         value: colorData.value as string,
    //       });
    //     }
    //   });
    // });

    // // Sort by color name, then by shade number
    // colorEntries.sort((a, b) => {
    //   if (a.colorName !== b.colorName) {
    //     return a.colorName.localeCompare(b.colorName);
    //   }
    //   const numA = parseInt(a.shade) || 0;
    //   const numB = parseInt(b.shade) || 0;
    //   return numA - numB;
    // });

    // return (
    //   <div>
    //     <WuiTitle>Color</WuiTitle>
    //     <table
    //       style={{
    //         width: "100%",
    //         borderCollapse: "collapse",
    //         marginTop: "24px",
    //       }}
    //     >
    //       <thead>
    //         <tr>
    //           <th
    //             style={{
    //               textAlign: "left",
    //               padding: "12px",
    //               borderBottom: "2px solid #e0e0e0",
    //             }}
    //           >
    //             <WuiText size={WuiTextSize.L}>Color</WuiText>
    //           </th>
    //           <th
    //             style={{
    //               textAlign: "left",
    //               padding: "12px",
    //               borderBottom: "2px solid #e0e0e0",
    //             }}
    //           >
    //             <WuiText size={WuiTextSize.L}>Shade</WuiText>
    //           </th>
    //           <th
    //             style={{
    //               textAlign: "left",
    //               padding: "12px",
    //               borderBottom: "2px solid #e0e0e0",
    //             }}
    //           >
    //             <WuiText size={WuiTextSize.L}>Example</WuiText>
    //           </th>
    //           <th
    //             style={{
    //               textAlign: "left",
    //               padding: "12px",
    //               borderBottom: "2px solid #e0e0e0",
    //             }}
    //           >
    //             <WuiText size={WuiTextSize.L}>Value</WuiText>
    //           </th>
    //           <th
    //             style={{
    //               textAlign: "left",
    //               padding: "12px",
    //               borderBottom: "2px solid #e0e0e0",
    //             }}
    //           >
    //             <WuiText size={WuiTextSize.L}>Enum</WuiText>
    //           </th>
    //         </tr>
    //       </thead>

    //       <tbody>
    //         {colorEntries.map((entry, index) => (
    //           <tr key={`${entry.colorName}-${entry.shade}-${index}`}>
    //             <td
    //               style={{ padding: "12px", borderBottom: "1px solid #e0e0e0" }}
    //             >
    //               <WuiText>
    //                 {entry.colorName.charAt(0).toUpperCase() +
    //                   entry.colorName.slice(1)}
    //               </WuiText>
    //             </td>
    //             <td
    //               style={{ padding: "12px", borderBottom: "1px solid #e0e0e0" }}
    //             >
    //               <WuiText>{entry.shade}</WuiText>
    //             </td>
    //             <td
    //               style={{ padding: "12px", borderBottom: "1px solid #e0e0e0" }}
    //             >
    //               <div
    //                 style={{
    //                   width: "60px",
    //                   height: "40px",
    //                   backgroundColor: entry.value,
    //                   border: "1px solid #e0e0e0",
    //                   borderRadius: "4px",
    //                 }}
    //               />
    //             </td>

    //             <td
    //               style={{
    //                 padding: "12px",
    //                 borderBottom: "1px solid #e0e0e0",
    //                 fontFamily: "monospace",
    //               }}
    //             >
    //               <code>{entry.value}</code>
    //             </td>

    //             <td
    //               style={{
    //                 padding: "12px",
    //                 borderBottom: "1px solid #e0e0e0",
    //                 fontFamily: "monospace",
    //               }}
    //             >
    //               <code>
    //                 WuiColor.{entry.colorName.toUpperCase()}_
    //                 {entry.shade.toUpperCase()}
    //               </code>
    //             </td>
    //           </tr>
    //         ))}
    //       </tbody>
    //     </table>
    //   </div>
    // );
  },
};
