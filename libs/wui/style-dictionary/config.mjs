import "./formats/enum-color-alias.js";
import "./formats/enum-color-name.js";
import "./formats/enum-color-value.js";
import "./transforms/px-to-rem.js";

export default {
  source: ["src/tokens/**/*.json"],
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
          destination: "tokens.css",
          format: "css/variables",
          options: {
            selector: ":root",
          },
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
