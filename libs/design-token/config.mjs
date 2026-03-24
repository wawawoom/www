import "./style-dictionary/formats/css-utils.js";
import "./style-dictionary/formats/enum-color-alias.js";
import "./style-dictionary/formats/enum-color-name.js";
import "./style-dictionary/formats/enum-color-value.js";
import "./style-dictionary/transforms/px-to-rem.js";
import "./style-dictionary/transforms/spacing-number-to-px.js";

export default {
  source: [
    "tokens/atomic/**/*.json",
    "tokens/semantic/color.json",
    "tokens/semantic/space.json",
  ],
  clean: true,
  log: {
    verbosity: "verbose",
  },
  platforms: {
    css: {
      prefix: "wui",
      transforms: [
        "attribute/cti",
        "attribute/color",
        "name/kebab",
        "size/spacing-number-to-px",
        "size/px-to-rem",
        "color/css",
      ],
      buildPath: "../wui/src/styles/",
      files: [
        {
          destination: "variables.css",
          format: "css/variables",
          options: {
            selector: ":root",
            outputReferences: true,
          },
        },
        {
          destination: "utils.css",
          format: "css/utils",
        },
      ],
    },
    typescript: {
      transformGroup: "js",
      buildPath: "src/enum/generated/",
      files: [
        {
          destination: "WuiColorName.enum.ts",
          format: "typescript/enum-color-name",
        },
        {
          destination: "WuiColorValue.enum.ts",
          format: "typescript/enum-color-value",
        },
        {
          destination: "WuiColorAlias.enum.ts",
          format: "typescript/enum-color-alias",
        },
      ],
    },
  },
};
