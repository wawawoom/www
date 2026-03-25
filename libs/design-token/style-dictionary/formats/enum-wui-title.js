import StyleDictionary from "style-dictionary";

import { getTitleFontSizeTokenEntries } from "../helpers.js";

function buildTitleEnumTypeScript(enumName, dictionary) {
  const entries = getTitleFontSizeTokenEntries(dictionary);
  if (entries.length === 0) {
    throw new Error(
      `typescript/enum-wui-title: no tokens under title.font.size for ${enumName} (font.json)`
    );
  }
  const lines = entries.map(
    (e) => `  ${e.enumMember} = ${JSON.stringify(e.value)}`
  );
  return `// Do not edit directly, this file was auto-generated.
// Generated from libs/design-token/src/tokens/atomic/font.json → title.font.size (key order from tokens).
// Import from @wawawoom/design-token/enum (see src/enum/index.ts).

export enum ${enumName} {
${lines.join(",\n")},
}
`;
}

StyleDictionary.registerFormat({
  name: "typescript/enum-wui-title-as",
  format: function ({ dictionary }) {
    return buildTitleEnumTypeScript("WuiTitleAs", dictionary);
  },
});

StyleDictionary.registerFormat({
  name: "typescript/enum-wui-title-look",
  format: function ({ dictionary }) {
    return buildTitleEnumTypeScript("WuiTitleLook", dictionary);
  },
});
