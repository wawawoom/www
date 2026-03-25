# @wawawoom/design-token

Shared **design tokens** (JSON) and **Style Dictionary** configuration for the monorepo. This package is the **single place** where token JSON is edited and where enums are **generated**; **`@wawawoom/wui`** and **`wui-rn`** consume the outputs (CSS, JSON imports, TypeScript enums).

## Contents

- `src/tokens/` — token source files (atomic, semantic). **Edit these** to change the palette or scales. Text and title font sizes live in `src/tokens/atomic/font.json`.
- `config.mjs` / `config-dark.mjs` — Style Dictionary entrypoints (run from this package root).
- `style-dictionary/` — custom formats, transforms, and `helpers.js` (including `spacing-number-to-px.js`: spacing JSON uses **numbers**; CSS variables get `Npx`). Typography enums: `formats/enum-wui-text-size.js`, `enum-wui-text-weight.js`, `enum-wui-font-family.js`, `enum-wui-title.js` (`WuiTitleAs` / `WuiTitleLook`).
- `src/enum/index.ts` — barrel that re-exports all generated enums.
- `src/enum/WuiColorName.ts`, `WuiColorValue.ts`, `WuiColorAlias.ts` — **generated** by Style Dictionary (do not edit; regenerate with `build:tokens`).
- `src/enum/WuiTextSize.ts`, `WuiTextWeight.ts`, `WuiFontFamily.ts`, `WuiTitleAs.ts`, `WuiTitleLook.ts` — **generated** by Style Dictionary custom formats from `src/tokens/atomic/font.json` (same `typescript` platform as color enums).

## Package exports

Declared in `package.json`:

| Subpath                           | Purpose                                                               |
| --------------------------------- | --------------------------------------------------------------------- |
| `@wawawoom/design-token/enum`     | Color enums, text/title typography enums (`WuiTextSize`, `WuiTextWeight`, `WuiFontFamily`, `WuiTitleAs`, `WuiTitleLook`) |
| `@wawawoom/design-token/tokens/*` | JSON token files (e.g. `atomic/color.json`) for runtime imports in RN |

## Scripts

| Script         | What it does                                                                                                                                                                                                |
| -------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `build:tokens` | Runs Style Dictionary (`config.mjs` then `config-dark.mjs`): writes CSS under `libs/wui/src/styles/`, all enums under `src/enum/`, then `generate-wui-rn-variables.mjs` (`wui-rn` `variables.ts` only). Does **not** run `generate-dark-prefers.js` (that lives in `wui`). |
| `watch:tokens` | Nodemon watches `src/tokens/**/*.json`; on change runs `build:tokens` then `node ../wui/scripts/generate-dark-prefers.js`.                                                                                  |

`scripts/generate-wui-rn-variables.mjs` **must** run after Style Dictionary in the same pipeline: it reads `src/enum/WuiTextSize.ts` for the **key order** of `wuiTextFontSize` (aligned with `WuiTextSize`); numeric values still come from `src/tokens/atomic/font.json` → `text.font.size`.

## Watch (dev)

When working on token JSON, run from the repo root:

```bash
pnpm --filter @wawawoom/design-token run watch:tokens
```

Or use `pnpm run dev` inside `libs/wui` or `libs/wui-rn`, which runs this watch alongside Storybook. Nodemon lives **here** so it watches `src/tokens/` inside this package (watching `../design-token` from `libs/wui` is unreliable). The watch command also runs `libs/wui/scripts/generate-dark-prefers.js` after each rebuild.

## Build

From the repository root:

```bash
pnpm --filter @wawawoom/design-token run build:tokens
```

This must be run with the **current working directory** set to `libs/design-token` (pnpm scripts do this automatically). It generates:

- `libs/wui/src/styles/variables.css`, `utils.css`, `variables-dark.css`
- `libs/wui-rn/src/styles/variables.ts` (React Native theme; same token JSON as `variables.css`)
- `libs/design-token/src/enum/*.ts` — color + typography enums (Style Dictionary `style-dictionary/formats/enum-*.js`)

The `@wawawoom/wui` package runs this via `pnpm run build:variables`, then executes `scripts/generate-dark-prefers.js` in `wui` to produce `variables-dark-prefers.css`. `@wawawoom/wui` re-exports enums from `@wawawoom/design-token/enum`.

## Consumers

- **Web (`@wawawoom/wui`):** imports generated CSS from `src/styles/`. Library code imports `@wawawoom/design-token/enum`; the public `wui` package **re-exports** those enums so apps can import from `@wawawoom/wui` if desired.
- **React Native (`wui-rn`):** imports `wui` from `src/styles/variables.ts` and enums from `@wawawoom/design-token/enum`. **Metro** must resolve that subpath to source (see `libs/wui-rn/metro.config.js` and `apps/rn/metro.config.js`). Expo font asset names are wired in `variables.ts` via `wuiFontAssets`.

## See also

- Monorepo overview: root `README.md` section **Design tokens and Style Dictionary**.
- Web library workflow: `libs/wui/README.md` (**Tokens and build**).
- React Native: `libs/wui-rn/README.md` (**Design tokens and Style Dictionary**, Metro).
