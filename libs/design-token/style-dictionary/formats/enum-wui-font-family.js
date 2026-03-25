import StyleDictionary from "style-dictionary";

import { getFontFamilyTokenEntries } from "../helpers.js";

StyleDictionary.registerFormat({
  name: "typescript/enum-wui-font-family",
  format: function ({ dictionary }) {
    const entries = getFontFamilyTokenEntries(dictionary);
    if (entries.length === 0) {
      throw new Error(
        "typescript/enum-wui-font-family: no fontFamily tokens under font.* (font.json)"
      );
    }
    const lines = entries.map(
      (e) => `  ${e.enumMember} = ${JSON.stringify(e.value)}`
    );
    return `// Do not edit directly, this file was auto-generated.
// Generated from libs/design-token/src/tokens/atomic/font.json → font.* (type fontFamily; key order from tokens).
// Import from @wawawoom/design-token/enum (see src/enum/index.ts).

export enum WuiFontFamily {
${lines.join(",\n")},
}
`;
  },
});
