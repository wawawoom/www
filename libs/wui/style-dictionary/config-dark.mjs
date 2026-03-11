import "./transforms/px-to-rem.js";

/** Build des variables CSS pour le thème dark (sélecteur [data-theme="dark"]). */
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
      buildPath: "src/styles/",
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
