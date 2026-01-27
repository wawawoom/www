import "./style-dictionary/formats/enum-color-name.js";
import "./style-dictionary/formats/enum-color-value.js";
import "./style-dictionary/transforms/px-to-rem.js";

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
          format: "typescript/enum",
        },
        {
          destination: "WuiColorValue.enum.ts",
          format: "typescript/enum-color-values",
        },
      ],
    },
  },
};
