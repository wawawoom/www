import StyleDictionary from "style-dictionary";

import { getTextFontSizeTokenEntries } from "../helpers.js";

StyleDictionary.registerFormat({
  name: "typescript/enum-wui-text-size",
  format: function ({ dictionary }) {
    const entries = getTextFontSizeTokenEntries(dictionary);
    if (entries.length === 0) {
      throw new Error(
        "typescript/enum-wui-text-size: no tokens under text.font.size (font.json)"
      );
    }
    const lines = entries.map(
      (e) => `  ${e.enumMember} = ${JSON.stringify(e.value)}`
    );
    return `// Do not edit directly, this file was auto-generated.
// Generated from libs/design-token/src/tokens/atomic/font.json → text.font.size (key order from tokens).
// Import from @wawawoom/design-token/enum (see src/enum/index.ts).

export enum WuiTextSize {
${lines.join(",\n")},
}
`;
  },
});
