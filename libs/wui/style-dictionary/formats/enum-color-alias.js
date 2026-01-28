import StyleDictionary from "style-dictionary";

import { getColorEntries } from "../helpers.js";

// Format personnalisé pour générer l'enum TypeScript WuiColorAlias
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
// Generated from tokens/semantic/color.json

export enum WuiColorAlias {
${enumEntries.join(",\n")}
}
`;
  },
});
