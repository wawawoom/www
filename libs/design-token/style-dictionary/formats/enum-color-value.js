import StyleDictionary from "style-dictionary";

import { getColorEntries } from "../helpers.js";

// Custom format: TypeScript enum WuiColorValue (hex values)
StyleDictionary.registerFormat({
  name: "typescript/enum-color-value",
  format: function ({ dictionary }) {
    const entries = getColorEntries(dictionary, "color", (token) => {
      return token.value;
    });

    const enumEntries = entries.map(
      (entry) => `  ${entry.key} = "${entry.value}"`
    );

    return `// Do not edit directly, this file was auto-generated.
// Import from @wawawoom/design-token/enum (see src/enum/index.ts).
// Generated from libs/design-token/src/tokens/atomic/color.json

export enum WuiColorValue {
${enumEntries.join(",\n")}
}
`;
  },
});
