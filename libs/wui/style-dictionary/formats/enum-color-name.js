import StyleDictionary from "style-dictionary";
import { getColorEntries } from "../helpers.js";

// Format personnalisé pour générer l'enum TypeScript
StyleDictionary.registerFormat({
  name: "typescript/enum",
  format: function ({ dictionary }) {
    const entries = getColorEntries(dictionary, (token, colorName, shade) => {
      return `${colorName}-${shade}`;
    });

    const enumEntries = entries.map(
      (entry) => `  ${entry.key} = "${entry.value}"`
    );

    return `// Do not edit directly, this file was auto-generated.
// Generated from tokens/core/color.json

export enum WuiColorName {
${enumEntries.join(",\n")}
}
`;
  },
});
