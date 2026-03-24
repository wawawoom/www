import StyleDictionary from "style-dictionary";

import { getColorEntries } from "../helpers.js";

// Custom format: TypeScript enum WuiColorAlias
StyleDictionary.registerFormat({
  name: "typescript/enum-color-alias",
  format: function ({ dictionary }) {
    const entries = getColorEntries(
      dictionary,
      "colorAlias",
      (token, colorName, shade) => {
        return `${colorName}-${shade}`;
      }
    );

    const enumEntries = entries.map(
      (entry) => `  ${entry.key} = "${entry.value}"`
    );

    return `// Do not edit directly, this file was auto-generated.
// Generated from libs/design-token/tokens/semantic/color.json

export enum WuiColorAlias {
${enumEntries.join(",\n")}
}
`;
  },
});
