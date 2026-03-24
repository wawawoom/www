# @wawawoom/design-token

Shared **design tokens** (JSON) and **Style Dictionary** configuration for the monorepo. This package is the **single place** where token JSON is edited and where color enums are **generated**; **`@wawawoom/wui`** and **`wui-rn`** consume the outputs (CSS, JSON imports, TypeScript enums).

## Contents

- `tokens/` — token source files (atomic, semantic). **Edit these** to change the palette or scales. Text and title font sizes live in `tokens/atomic/font.json`.
- `config.mjs` / `config-dark.mjs` — Style Dictionary entrypoints (run from this package root).
- `style-dictionary/` — custom formats, transforms, and `helpers.js` (including `spacing-number-to-px.js`: spacing JSON uses **numbers**; CSS variables get `Npx`).
- `src/enum/index.ts` — re-exports generated color enums.
- `src/enum/generated/` — **generated** `WuiColorName`, `WuiColorValue`, `WuiColorAlias` (do not edit; regenerate with `build:tokens`).

## Package exports

Declared in `package.json`:

| Subpath                           | Purpose                                                               |
| --------------------------------- | --------------------------------------------------------------------- |
| `@wawawoom/design-token/enum`     | `WuiColorName`, `WuiColorValue`, `WuiColorAlias`                      |
| `@wawawoom/design-token/tokens/*` | JSON token files (e.g. `atomic/color.json`) for runtime imports in RN |

## Scripts

| Script         | What it does                                                                                                                                                                                                |
| -------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `build:tokens` | Runs Style Dictionary (`config.mjs` then `config-dark.mjs`): writes CSS under `libs/wui/src/styles/`, enums under `src/enum/generated/`. Does **not** run `generate-dark-prefers.js` (that lives in `wui`). |
| `watch:tokens` | Nodemon watches `tokens/**/*.json`; on change runs `build:tokens` then `node ../wui/scripts/generate-dark-prefers.js`.                                                                                      |

## Watch (dev)

When working on token JSON, run from the repo root:

```bash
pnpm --filter @wawawoom/design-token run watch:tokens
```

Or use `pnpm run dev` inside `libs/wui` or `libs/wui-rn`, which runs this watch alongside Storybook. Nodemon lives **here** so it watches `tokens/` inside this package (watching `../design-token` from `libs/wui` is unreliable). The watch command also runs `libs/wui/scripts/generate-dark-prefers.js` after each rebuild.

## Build

From the repository root:

```bash
pnpm --filter @wawawoom/design-token run build:tokens
```

This must be run with the **current working directory** set to `libs/design-token` (pnpm scripts do this automatically). It generates:

- `libs/wui/src/styles/variables.css`, `utils.css`, `variables-dark.css`
- `libs/design-token/src/enum/generated/WuiColorName.enum.ts`, `WuiColorValue.enum.ts`, `WuiColorAlias.enum.ts` (re-exported from `@wawawoom/design-token/enum`)

The `@wawawoom/wui` package runs this via `pnpm run build:variables`, then executes `scripts/generate-dark-prefers.js` in `wui` to produce `variables-dark-prefers.css`. `@wawawoom/wui` re-exports color enums from `@wawawoom/design-token/enum`.

JSON under `tokens/` is also consumed at runtime by **`wui-rn`**: `libs/wui-rn/src/styles/atomic.ts` imports `tokens/atomic/color.json`, `tokens/semantic/color.json`, and `tokens/semantic/space.json` (spacing `value` fields are **numbers** = pixels) via the `exports` field of this package.

## Consumers

- **Web (`@wawawoom/wui`):** imports generated CSS from `src/styles/`. Library code imports color enums from `@wawawoom/design-token/enum`; the public `wui` package **re-exports** those enums so apps can import everything from `@wawawoom/wui` if desired.
- **React Native (`wui-rn`):** imports palette and spacing JSON via `@wawawoom/design-token/tokens/*` and color enums via `@wawawoom/design-token/enum`. Spacing numeric values become dp in `atomic.ts`. **Metro** must resolve the `enum` subpath to source (see `libs/wui-rn/metro.config.js` and `apps/rn/metro.config.js`). Font assets stay RN-specific in `atomic.ts` (Expo).

## See also

- Monorepo overview: root `README.md` section **Design tokens and Style Dictionary**.
- Web library workflow: `libs/wui/README.md` (**Tokens and build**).
- React Native: `libs/wui-rn/README.md` (**Design tokens and Style Dictionary**, Metro).
