import "./style-dictionary/transforms/px-to-rem.js";

/** Dark theme CSS variables (selector [data-theme="dark"]). */
export default {
  source: [
    "src/tokens/atomic/**/*.json",
    "src/tokens/semantic/color.dark.json",
  ],
  log: { verbosity: "verbose" },
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
      buildPath: "../wui/src/styles/",
      files: [
        {
          destination: "variables-dark.css",
          format: "css/variables",
          options: {
            selector: '[data-theme="dark"]',
            outputReferences: true,
          },
        },
      ],
    },
  },
};
