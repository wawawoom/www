import { defineConfig, globalIgnores } from "eslint/config";
import path from "path";
import { fileURLToPath } from "url";
import tseslint from "typescript-eslint";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

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
  // TypeScript files: use TypeScript parser so `import type`, `enum`, etc. parse correctly
  ...tseslint.configs.recommended,
  // Resolve tsconfig from repo root when multiple TS projects exist (apps/www, libs/wui)
  {
    files: ["**/*.ts", "**/*.tsx", "**/*.mjs", "**/*.cjs", "**/*.js"],
    languageOptions: {
      parserOptions: {
        tsconfigRootDir: __dirname,
      },
    },
  },
  ...noMultipleEmptyLinesConfig,
]);
