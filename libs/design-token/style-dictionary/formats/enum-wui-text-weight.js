import StyleDictionary from "style-dictionary";

import { getFontWeightTokenEntries } from "../helpers.js";

StyleDictionary.registerFormat({
  name: "typescript/enum-wui-text-weight",
  format: function ({ dictionary }) {
    const entries = getFontWeightTokenEntries(dictionary);
    if (entries.length === 0) {
      throw new Error(
        "typescript/enum-wui-text-weight: no tokens under font.weight (font.json)"
      );
    }
    const lines = entries.map(
      (e) => `  ${e.enumMember} = ${JSON.stringify(e.value)}`
    );
    return `// Do not edit directly, this file was auto-generated.
// Generated from libs/design-token/src/tokens/atomic/font.json → font.weight (key order from tokens).
// Import from @wawawoom/design-token/enum (see src/enum/index.ts).

export enum WuiTextWeight {
${lines.join(",\n")},
}
`;
  },
});
