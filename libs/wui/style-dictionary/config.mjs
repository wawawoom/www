import "./formats/css-utils.js";
import "./formats/enum-color-alias.js";
import "./formats/enum-color-name.js";
import "./formats/enum-color-value.js";
import "./transforms/px-to-rem.js";

export default {
  source: [
    "src/tokens/atomic/**/*.json",
    "src/tokens/semantic/color.json",
    "src/tokens/semantic/space.json",
    "src/tokens/components/**/*.json",
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
        "size/px-to-rem",
        "color/css",
      ],
      buildPath: "src/styles/",
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
      buildPath: "src/enum/",
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
