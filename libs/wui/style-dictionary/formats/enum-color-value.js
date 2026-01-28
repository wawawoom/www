import StyleDictionary from "style-dictionary";

import { getColorEntries } from "../helpers.js";

// Format personnalisé pour générer l'enum WuiColorValue avec les valeurs hexadécimales
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
// Generated from tokens/core/color.json

export enum WuiColorValue {
${enumEntries.join(",\n")}
}
`;
  },
});
