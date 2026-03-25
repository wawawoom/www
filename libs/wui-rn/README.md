# wui-rn

React Native UI library (Expo, on-device Storybook). It shares **design tokens** and **generated color enums** with the web design system via **`@wawawoom/design-token`**.

## Design tokens and Style Dictionary

- **Token sources** are edited in **`libs/design-token/src/tokens/`** (not in this package).
- **`src/styles/variables.ts`** is **generated** when you run `build:tokens` in `@wawawoom/design-token`. Do not edit generated files by hand.
- **Enums** (colors, `WuiTextSize`, `WuiTextWeight`, `WuiFontFamily`, `WuiTitleAs`, `WuiTitleLook`, …) live in **`libs/design-token/src/enum/`** when you run `build:tokens` or `watch:tokens` in `@wawawoom/design-token`. Import from **`@wawawoom/design-token/enum`** (this package re-exports them from `src/index.ts` for convenience). **`variables.ts`** also includes **`wuiTitleFontSize`** / **`wuiTitleLineHeightRatio`** for **`WuiTitle`** (aligned with web title tokens).

There is **no** `src/enum/` folder here; enums are not duplicated from `libs/wui`.

### Scripts

| Command                       | Description                                                                                                                       |
| ----------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| `pnpm run dev`                | Runs **`watch:tokens`** (delegates to `@wawawoom/design-token`) together with Storybook RN.                                       |
| `pnpm run watch:tokens`       | Delegates to `@wawawoom/design-token`: rebuilds CSS in `wui`, enums in `src/enum/`, **`variables.ts`**, then `libs/wui/scripts/generate-dark-prefers.js`. |
| `pnpm run start`              | Expo dev server (`expo start`).                                                                                                   |
| `pnpm run storybook-generate` | Regenerates the Storybook story index (run after adding or moving `*.stories.tsx` files).                                         |

### Metro and `@wawawoom/design-token/*`

Expo/Metro does not always resolve package **subpath exports** the same way as Node. This repo configures **`resolveRequest`** so `@wawawoom/design-token/enum` maps to source under `libs/design-token/src/`:

- `libs/wui-rn/metro.config.js`
- `apps/rn/metro.config.js` (when the consumer app bundles `wui-rn`)

## Storybook troubleshooting

If stories do not appear or Metro serves a stale bundle:

```bash
cd libs/wui-rn
pnpm run storybook-generate
pnpm start -- --clear
```

Or combine: `pnpm run storybook-generate && pnpm start -- --clear`.

To free the default Metro port (8081) if something is still listening:

```bash
kill $(lsof -tiTCP:8081 -sTCP:LISTEN)
```

## Further reading

- **`libs/design-token/README.md`** — Style Dictionary, `build:tokens`, exports.
- **Root `README.md`** — **Design tokens and Style Dictionary** and workspace commands.
