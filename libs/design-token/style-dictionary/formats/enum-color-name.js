import StyleDictionary from "style-dictionary";

import { getColorEntries } from "../helpers.js";

// Custom format: TypeScript enum WuiColorName
StyleDictionary.registerFormat({
  name: "typescript/enum-color-name",
  format: function ({ dictionary }) {
    const entries = getColorEntries(
      dictionary,
      "color",
      (token, colorName, shade) => {
        return `${colorName}-${shade}`;
      }
    );

    const enumEntries = entries.map(
      (entry) => `  ${entry.key} = "${entry.value}"`
    );

    return `// Do not edit directly, this file was auto-generated.
// Generated from libs/design-token/src/tokens/atomic/color.json (color names).
// Import from @wawawoom/design-token/enum (see src/enum/index.ts).

export enum WuiColorName {
${enumEntries.join(",\n")}
}
`;
  },
});
