import "./style-dictionary/formats/css-utils.js";
import "./style-dictionary/formats/enum-color-alias.js";
import "./style-dictionary/formats/enum-color-name.js";
import "./style-dictionary/formats/enum-color-value.js";
import "./style-dictionary/formats/enum-wui-font-family.js";
import "./style-dictionary/formats/enum-wui-text-size.js";
import "./style-dictionary/formats/enum-wui-text-weight.js";
import "./style-dictionary/formats/enum-wui-title.js";
import "./style-dictionary/transforms/px-to-rem.js";
import "./style-dictionary/transforms/spacing-number-to-px.js";

export default {
  source: [
    "src/tokens/atomic/**/*.json",
    "src/tokens/semantic/color.json",
    "src/tokens/semantic/space.json",
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
      buildPath: "src/enum/",
      files: [
        {
          destination: "WuiColorName.ts",
          format: "typescript/enum-color-name",
        },
        {
          destination: "WuiColorValue.ts",
          format: "typescript/enum-color-value",
        },
        {
          destination: "WuiColorAlias.ts",
          format: "typescript/enum-color-alias",
        },
        {
          destination: "WuiTextSize.ts",
          format: "typescript/enum-wui-text-size",
        },
        {
          destination: "WuiTextWeight.ts",
          format: "typescript/enum-wui-text-weight",
        },
        {
          destination: "WuiFontFamily.ts",
          format: "typescript/enum-wui-font-family",
        },
        {
          destination: "WuiTitleAs.ts",
          format: "typescript/enum-wui-title-as",
        },
        {
          destination: "WuiTitleLook.ts",
          format: "typescript/enum-wui-title-look",
        },
      ],
    },
  },
};
