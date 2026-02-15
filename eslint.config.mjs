import { defineConfig, globalIgnores } from "eslint/config";

/** Règle partagée : au plus 2 retours à la ligne consécutifs (1 ligne vide max). À étendre dans chaque app. */
export const noMultipleEmptyLinesConfig = [
  {
    files: ["**/*.{js,mjs,cjs,ts,tsx,jsx}"],
    rules: {
      "no-multiple-empty-lines": ["error", { max: 1, maxEOF: 1 }],
    },
  },
];

export default defineConfig([
  globalIgnores([
    "**/node_modules/**",
    "**/.pnpm-store/**",
    "**/dist/**",
    "**/build/**",
    ".git/**",
  ]),
  ...noMultipleEmptyLinesConfig,
]);
